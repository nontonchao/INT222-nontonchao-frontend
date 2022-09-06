import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from 'vue'

export const useLogin = defineStore("login", () => {
  const resStatus = ref(0);
  const token_obj = ref("");
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
    } else if (res.status == 401) {
      resStatus.value = 401

    } else if (res.status == 404) {
      resStatus.value = 404
    }
  };
  return {
    login,
    resStatus,
    token_obj,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot));
}
