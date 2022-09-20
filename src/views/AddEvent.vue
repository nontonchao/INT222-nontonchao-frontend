<script setup>
import EventAdd from '../components/eventAdd.vue';
import { useEventCategory } from "../stores/eventCategory.js";

const eventCateStore = useEventCategory();

</script>

<template>
  <div>
    <EventAdd :clinic_list="eventCateStore.eventCategoryList" />
  </div>
</template>

<style scoped>

</style>