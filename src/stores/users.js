import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useUsers = defineStore("users", () => {
  const users = ref([]);
  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
      method: "GET",
    });
    if (res.status == 200) {
      users.value = await res.json();
    } else {
      console.log("error while fetching");
    }
    return users.value;
  };

  const userRegister = async (new_user) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    });
    if (res.status == 201) {
      alert("user created!");
    } else {
      console.log("error while registering");
    }
  };

  return {
    fetchUsers,
    userRegister,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}
