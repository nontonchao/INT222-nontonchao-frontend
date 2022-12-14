import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useUsers = defineStore("users", () => {
  const users = ref([]);
  const resStatus = ref(0);
  const statusMessage = ref("");

  const removable = ref(true);
  const associate_list = ref([]);
  const owning_list = ref([]);

  const fetchLecturers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/lecturers`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      },
    });
    if (res.status == 200) {
      users.value = await res.json();
    } else {
      console.log("error while fetching");
    }
    return users.value;
  }
  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      },
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
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
        "content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    });
    if (res.status == 201) {
      resStatus.value = res.status
      // alert("user created!");
    } else {
      resStatus.value = res.status
      console.log("error while registering");
    }
  };

  const emailCheck = async (email) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/check?email=${email}`, {
      method: "GET", headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      }
    });
    if (res.status == 200) {
      resStatus.value = res.status;

    } else {
      resStatus.value = res.status;

    }
  }

  const getUserById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      },
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
  };

  const deleteUser = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
      }
    );
    if (res.status === 200) {
      alert("user removed");
    } else {
      alert("error while delete || error :" + statusMessage.value);
    }
  };

  const getAssociate = async (id) => {
    removable.value = true;
    associate_list.value = [];
    owning_list.value = [];
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}users/check/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      }
    });
    const result = await res.json();
    associate_list.value = result.last;
    owning_list.value = result.owning;
    console.log(owning_list.value);
    if (associate_list.value.length > 0) {
      removable.value = false;
    }
  }

  const editUser = async (id, toEditUser) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}users/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify(toEditUser),
      }
    );
    if (res.status == 200) {
      resStatus.value = res.status
      alert("user edited");
    } else if (res.status == 400) {
      resStatus.value = res.status
    } else {
      alert("error while editing");
    }
    resStatus.value = res.status
  };

  const isEmailNotUnique = (targetEmail) => {
    return users.value
      .some((user) => user.email === targetEmail)
  };

  const logout = () => {
    users.value = []

  }


  return {
    fetchUsers,
    fetchLecturers,
    userRegister,
    getUserById,
    validateName,
    validateEmail,
    deleteUser,
    editUser,
    getAssociate,
    owning_list,
    removable,
    associate_list,
    resStatus,
    isEmailNotUnique,
    emailCheck,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}