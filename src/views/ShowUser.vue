<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useUsers } from "../stores/users.js";
import { useRouter } from "vue-router";
import { useLogin } from '../stores/login.js';

const users = ref([]);
const userStore = useUsers();
const router = useRouter();
const loginStore = useLogin();

onBeforeMount(async () => {
  users.value = await userStore.fetchUsers();
});

onMounted(async () => {
  users.value = await userStore.fetchUsers();
});
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #f5f5f7">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"><span class="fw-bold">ผู้ใช้ทั้งหมด</span></a>
          </div>
        </nav>
      </section>
      <div class="container pt-5">
        <div>
          <!-- userList -->
          <div v-if="loginStore.isAdmin">
            <div class="border rounded border-1 p-3" v-if="users.length != 0">
              <div class="panel panel-primary">
                <div class="panel-body my-5 text-center">
                  <ul class="list-group list-group-flush">
                    <a>
                      <li class="list-group-item hover" v-for="(user, index) in users" :key="user.user_id"
                        @click="router.push(`/UserInfo/${user.id}`)">
                        <div class="row row-cols-2 row-cols-md-3">
                          <div class="col">
                            <div class="my-4">
                              <img src="../assets/testimg.png"
                                class="rounded img-fluid rounded-circle float-start w-25" />
                              <strong> {{ user.name }} </strong>
                              <p class="text-muted"></p>
                            </div>
                          </div>
                          <div class="col">
                            <div class="my-4">
                              <p class="vrtext-muted card-subtitle mb-2 text-muted">
                                {{}}
                              </p>
                              <strong>อีเมล{{ user.user_id }}</strong>
                              <p class="text-muted my">{{ user.email }}</p>
                            </div>
                          </div>
                          <div class="col">
                            <div class="my-4">
                              <strong>{{ user.role }}</strong>
                            </div>
                          </div>
                        </div>
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else>
              NO USERS
            </div>
          </div>
          <div v-else>
            ไม่มีสิทธิ์เข้าถึงหน้านี้
          </div>
          <!-- eventList -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hover:hover {
  background-color: darkgray;
  cursor: pointer;
}
</style>
