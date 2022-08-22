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
      // alert("user created!");
    } else {
      console.log("error while registering");
    }
  };

  const getUserById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
      method: "GET",
    });
    return await res.json();
  };

  const validateName = (firstname, lastname) => {
    let name = firstname + " " + lastname;
    if (name.length != 0 && name.length < 100) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const validateEmail = (email) => {
    if (
      email.trim().length != 0 &&
      email.trim().length < 100 &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        email.trim()
      )
    ) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  return {
    fetchUsers,
    userRegister,
    getUserById,
    validateName,
    validateEmail,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}
