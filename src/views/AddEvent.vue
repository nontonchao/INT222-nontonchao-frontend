<script setup>
import { onBeforeMount } from "vue";
import EventAdd from '../components/eventAdd.vue';
import { useEvents } from "../stores/events.js";
import { useEventCategory } from "../stores/eventCategory.js";

const eventStore = useEvents();
const eventCateStore = useEventCategory();

onBeforeMount(async () => {
  await eventStore.fetchEvents();
});

</script>

<template>
  <div>
    <EventAdd :clinic_list="eventCateStore.eventCategoryList" />
  </div>
</template>

<style scoped>
</style>