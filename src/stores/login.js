import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from 'vue'
import { useUsers } from "./users";


export const useLogin = defineStore("login", () => {
  const resStatus = ref(0);
  const token_obj = ref("");
  const userStore = useUsers()

  const logout = () => {
    localStorage.clear(); // clear localstorage
    isLogin.value = false;
    userStore.logout();
    // location.reload();
  };

  const isLogin = () => {
    if (localStorage.getItem("name") != null && localStorage.getItem("access_token") != null) {
      return true;
    } else {
      return false;
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
      isLogin.value = true;
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
    resStatus,
    token_obj,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot));
}
