import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useEvents = defineStore("events", () => {
  const events = ref([]);

  const addEvent = async (event) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status == 201) {
      alert("event added");
      await fetchEvents();
    } else if (res.status == 400) {
      alert("error while adding 400");
    } else {
      alert("error while adding");
    }
  };

  const getEventById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events/${id}`, {
      method: "GET",
    });
    return await res.json();
  };

  const removeEvent = async (eventId) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/delete/${eventId}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      alert("event removed");
    } else {
      alert("error while delete || error :" + statusMessage.value);
    }
  };

  const editEvent = async (eventId, editEvent) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editEvent),
      }
    );
    if (res.status == 200) {
      alert("event edited");
    } else if (res.status == 400) {
    } else {
      alert("error while editing");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}events`, {
        method: "GET",
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
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEvents, import.meta.hot));
}
