import { defineStore, acceptHMRUpdate } from "pinia";

export const useLogin = defineStore("login", () => {
  const login = async (email, password) => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }match?email=${email}&password=${password}`
    );
    if (res.status == 200) {
      alert("Password Matched.");
    } else if (res.status == 400) {
      alert("Password NOT Matched.");
    } else {
      alert("A user with the specified email DOES NOT exist.");
    }
  };
  return {
    login,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot));
}
