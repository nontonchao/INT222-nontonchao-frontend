import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useEventCategory = defineStore("eventCategory", () => {
  const eventCategoryList = ref([]);
  const resEditText = ref({});
  const getEventCategoryList = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events-category`, {
      method: "GET",
    });
    if (res.status == 200) {
      eventCategoryList.value = await res.json();
    } else {
      console.log("error while fetching");
    }
  };

  const getEventCategoryById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}events-category/${id}`, {
      method: "GET",
    });
    if (res.status == 200) {
      eventCategoryList.value = await res.json();
    } else {
      console.log("error while fetching");
    }
  };

  const editEventCategory = async (updatedEventCat) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}events-category/${updatedEventCat.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedEventCat),
      }
    );
    if (res.status == 200) {
      // alert(`${updatedEventCat.id} edit แล้ว`);
      resEditText.value = await res.json();
      console.log(resEditText.value);
      return getEventCategoryList();
    } else if (res.status == 400) {
      resEditText.value = await res.json();
      alert("error while editing || error: " + resEditText.value);
    } else {
      alert("error while editing || error: " + (await res.text()));
    }
  };

  getEventCategoryList();

  const isNotUnique = (editCate) => {
    return eventCategoryList.value
      .filter((cate) => cate.id !== editCate.id)
      .some((cate) => cate.eventCategoryName === editCate.eventCategoryName);
  };

  return {
    getEventCategoryList,
    editEventCategory,
    resEditText,
    eventCategoryList,
    isNotUnique,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventCategory, import.meta.hot));
}
