<script setup>
import { ref, onBeforeMount } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useLogin } from '../stores/login.js';

const category = ref([]);
const categoryStore = useEventCategory();
const loginStore = useLogin();

onBeforeMount(async () => {
    category.value = await categoryStore.getEventCategoryOwners();
});

</script>

<template>
    <div>
        <section class="py-4 py-xl-5" style="background: #f5f5f7">
            <section class="border bottom-dark" style="background: #ffffff">
                <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
                    <div class="container">
                        <a class="navbar-brand d-flex align-items-center" href="#"><span
                                class="fw-bold">จัดการคลินิก</span></a>
                    </div>
                </nav>
            </section>
            <div class="container pt-5">
                <div>
                    <!-- category manage -->
                    <div v-if="loginStore.isAdmin">
                        <div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Clinic Name</th>
                                        <th scope="col">Owner Name</th>
                                        <th scope="col">Remove?</th>
                                    </tr>
                                </thead>
                                <tbody v-for="l in category">
                                    <tr>
                                        <th scope="row">{{ l.id }}</th>
                                        <td>{{ l.eventCategory.eventCategoryName }}</td>
                                        <td>{{ l.user.name }}</td>
                                        <td><button>remove</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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