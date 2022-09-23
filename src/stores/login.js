import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from 'vue'
import { useUsers } from "./users";


export const useLogin = defineStore("login", () => {
  const resStatus = ref(0);
  const token_obj = ref("");
  const userStore = useUsers();
  const isAdmin = ref(false);
  const name = ref("");
  const email = ref("");

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const logout = () => {
    localStorage.clear(); // clear localstorage
    userStore.logout();
    isLogin.value = false;
    isAdmin.value = false;
    name.value = "";
    email.value = "";
    //location.reload();
  };

  const isLogin = () => {
    if (localStorage.getItem("name") != null && localStorage.getItem("access_token") != null) {
      refresh();
      if ((parseJwt(localStorage.getItem("access_token"))).role == "ROLE_ADMIN") { // check role from localstorage token
        isAdmin.value = true;
      };
      name.value = (parseJwt(localStorage.getItem("access_token")).name);
      email.value = (parseJwt(localStorage.getItem("access_token")).sub);
      return true;
    } else {
      return false;
    }
  }

  const refresh = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL
      }login/refresh`
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access_token"),
          "isRefreshToken": true
        },
      });

    let response = await res.text();

    if (response === "cannot refresh this token") {
      logout();
    } else if (response === "this token still valid") {
    } else {
      // set new refreshed token
      localStorage.setItem("access_token", (JSON.parse(response).token));
    }

  }

  const login = async (email, password) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL
      }login`
      , {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "content-type": "application/json",
        },
      })
    if (res.status == 200) {
      resStatus.value = 200
      token_obj.value = await res.json();

      if ((parseJwt(token_obj.value.token)).role === "ROLE_ADMIN") {
        isAdmin.value = true;
      }

    } else if (res.status == 401) {
      resStatus.value = 401

    } else if (res.status == 404) {
      resStatus.value = 404
    }
  };

  return {
    login,
    logout,
    isLogin,
    parseJwt,
    name,
    email,
    isAdmin,
    resStatus,
    token_obj,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot));
}
