import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useEvents = defineStore("events", () => {
  const events = ref([]);
  const addCode = ref(0);
  const editCode = ref(0);
  const addEvent = async (event) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status == 201) {
      addCode.value = res.status;
      await fetchEvents();
    } else if (res.status == 400) {
      addCode.value = res.status;
    } else {
      console.log("error while adding");
    }
  };

  const getEventById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events/${id}`, {
      method: "GET",
    });
    return await res.json();
  };

  const removeEvent = async (eventId, obj) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/delete/${eventId}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      const eventIndex = obj.findIndex((event) => event.id === eventId);
      obj.splice(eventIndex, 1);
      return obj;
    } else {
      console.log("error while delete || error :" + statusMessage.value);
    }
  };

  const editEvent = async (editEvent, obj) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events/${editEvent.eventId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editEvent.toUpdate),
      }
    );
    if (res.status == 200) {
      editCode.value = res.status;
      const eventIndex = obj.findIndex(
        (event) => event.id === editEvent.eventId
      );
      obj[eventIndex].eventStartTime = editEvent.toUpdate.eventStartTime;
      obj[eventIndex].eventNotes = editEvent.toUpdate.eventNotes;
      return obj;
    } else if (res.status == 400) {
      editCode.value = res.status;
    } else {
      console.log("error while editing");
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
    addCode,
    editCode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEvents, import.meta.hot));
}
