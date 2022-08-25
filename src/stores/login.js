import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from 'vue'

export const useLogin = defineStore("login", () => {
  const resStatus = ref(0);
  const login = async (email, password) => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }match?email=${email}&password=${password}`
    );
    if (res.status == 200) {
      resStatus.value = 200
      alert("Password Matched.");
    } else if (res.status == 401) {
      resStatus.value = 401
      alert("Password NOT Matched.");
    } else if (res.status == 404) {
      resStatus.value = 404
      alert("A user with the specified email DOES NOT exist.");

    }
  };
  return {
    login,
    resStatus,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot));
}
