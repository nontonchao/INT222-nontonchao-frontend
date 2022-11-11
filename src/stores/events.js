import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useLogin } from "./login.js";

export const useEvents = defineStore("events", () => {
  const events = ref([]);
  const statusCode = ref(0)
  const loginStore = useLogin();

  const addEvent = async (event) => {
    if (loginStore.isLoggedIn == true) {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}events`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify(event),
      });
      if (res.status == 201) {
        statusCode.value = res.status
        await fetchEvents();
      } else if (res.status == 400) {
        statusCode.value = res.status
        // alert("error while adding 400");
      } else {
        statusCode.value = res.status
        alert("error while adding");
      }
    } else {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}events`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (res.status == 201) {
        statusCode.value = res.status
        await fetchEvents();
      } else if (res.status == 400) {
        statusCode.value = res.status
        // alert("error while adding 400");
      } else {
        statusCode.value = res.status
        alert("error while adding");
      }
    }
  };

  const getEventById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      }
    });

    return await res.json();
  };

  const removeEvent = async (eventId) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/delete/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
      }
    );
    if (res.status === 200) {
      statusCode.value = res.status
    } else {
      statusCode.value = res.status
    }
  };

  const editEvent = async (eventId, editEvent) => {
    console.log(editEvent);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify(editEvent),
      }
    );

    if (res.status == 200) {
      statusCode.value = res.status
      // alert("event edited");
    } else if (res.status == 400) {
      statusCode.value = res.status
    } else {
      statusCode.value = res.status
      alert("error while editing");
    }
  };

  const getTime = async (date, eventCategoryId) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/date/${date}/${eventCategoryId}`)
    if (res.status == 200) {
      statusCode.value = res.status
      return await res.json();
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}events/`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
      });
      events.value = await res.json();
      events.value.forEach((event) => {
        if (event.eventNotes == null) {
          event.eventNotes = "";
        }
      });
      return events.value;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    events,
    fetchEvents,
    removeEvent,
    getEventById,
    addEvent,
    editEvent,
    getTime,
    statusCode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEvents, import.meta.hot));
}
