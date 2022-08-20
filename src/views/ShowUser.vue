<script setup>
import { ref, onBeforeMount } from "vue";
import { useUsers } from "../stores/users.js";

const users = ref([]);
const userStore = useUsers();

onBeforeMount(async () => {
  users.value = await userStore.fetchUsers();
});
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #f5f5f7">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav
          class="navbar navbar-light navbar-expand-md py-3"
          style="margin: 2px"
        >
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"
              ><span class="fw-bold">ผู้ใช้ทั้งหมด</span></a
            >
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto">
                <!-- <li class="nav-item"><a class="nav-link active" href="#">กำลังจะมาถึง</a></li>
                                <li class="nav-item"><a class="nav-link" href="#">กำลังดำเนินอยู่</a></li>
                                <li class="nav-item"><a class="nav-link" href="#">ที่ผ่านมา</a></li> -->
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <h1>Ny TEST</h1>
      <ul v-for="(user, index) in users" :key="user.user_id">
        <li>{{ user.user_id }}</li>
        <li>{{ user.name }}</li>
        <li>{{ user.email }}</li>
        <li>{{ user.role }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped></style>
