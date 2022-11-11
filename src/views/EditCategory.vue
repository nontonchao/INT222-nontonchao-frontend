<script setup>
import { ref, onBeforeMount } from "vue";
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

</script>

<template>
    <div>
        <section class="py-4 py-xl-5" style="background: #f5f5f7">
            <section class="border bottom-dark" style="background: #ffffff">
                <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
                    <div class="container">
                        <a class="navbar-brand d-flex align-items-center" href="#"><span class="fw-bold">จัดการ
                                Category</span></a>
                    </div>
                </nav>
            </section>
            <div class="container pt-5">
                <div>
                    <!-- category manage -->
                    <div v-if="loginStore.isAdmin">
                        <h1>จัดการจ้า</h1>
                    </div>
                    <div v-else>
                        ไม่มีสิทธิ์เข้าถึงหน้านี้
                    </div>
                    <!-- category manage -->
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>