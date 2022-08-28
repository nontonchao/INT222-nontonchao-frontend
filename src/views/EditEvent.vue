<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useEvents } from "../stores/events";
import eventEdit from "../components/eventEdit.vue";

const route = useRoute();
const eventStore = useEvents();
const thisEvent = ref({});

onBeforeMount(async () => {
  thisEvent.value = await eventStore.getEventById(route.params.event_id);
});
</script>

<template>
  <div>
    <eventEdit :eventz="thisEvent" />
  </div>
</template>

<style scoped>
</style>
