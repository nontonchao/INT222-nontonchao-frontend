<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useUsers } from "../stores/users";
import userEdit from "../components/userEdit.vue";

const route = useRoute();
const eventStore = useUsers();
const thisUser = ref({});

onBeforeMount(async () => {
  thisUser.value = await eventStore.getUserById(route.params.user_id);
});
</script>

<template>
  <div>
    <userEdit :userz="thisUser" />
  </div>
</template>

<style scoped></style>
