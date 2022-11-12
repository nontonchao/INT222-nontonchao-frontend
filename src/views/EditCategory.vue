<script setup>
import { ref, onBeforeMount } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useLogin } from '../stores/login.js';
import { useUsers } from '../stores/users.js';

const owner_list = ref([]);
const category = ref([]);
const users = ref([]);
const categoryStore = useEventCategory();
const userStore = useUsers();
const loginStore = useLogin();
const selected_clinic = ref();
const selected_user = ref();

function ale(u) {
    alert(u);
}
onBeforeMount(async () => {
    owner_list.value = await categoryStore.getEventCategoryOwners();
    users.value = await userStore.fetchUsers();
    await categoryStore.getEventCategoryList();
    category.value = categoryStore.eventCategoryList;
});

const remove = async (c, u, i) => {
    const status = await categoryStore.removeEventCategoryOwners(c, u);
    if (status === 200) {
        owner_list.value.splice(i, 1);
    } else {
        alert('error while delete');
    }
}

const add = async (c, u) => {
    if (c != undefined && u != undefined) {
        const status = await categoryStore.addEventCategoryOwners(c, u);
        if (status === 201) {
            // owner_list.value.push({
            //     eventCategory: {
            //         eventCategoryName: category.value[selected_clinic_index.value].eventCategoryName
            //     },
            //     user: {
            //         name: users.value[selected_user_index.value].name
            //     }
            // });
            owner_list.value = await categoryStore.getEventCategoryOwners();
            alert('added successfully!');
        } else {
            alert('error while adding');
        }
    } else {
        alert('select first!');
    }
}
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

                            <!-- add -->
                            <select v-model="selected_clinic" class="form-select form-select-sm">
                                <option disabled value="">คลินิก</option>
                                <option v-for="(e, index) in category" :key="index" :value="e.id">
                                    {{ e.eventCategoryName }}
                                </option>
                            </select>
                            <select v-model="selected_user" class="form-select form-select-sm">
                                <option disabled value="">ผู้ใช้</option>
                                <option v-for="(e, index) in users" :key="index" :value="e.id">
                                    {{ e.name }}
                                </option>
                            </select>
                            <button @click="add(selected_clinic, selected_user)" type="button" class="btn btn-danger"
                                style="margin-bottom: 10px; float:right;">เพิ่ม</button>
                            <!-- add -->

                            <table class="table">
                                <thead class="thead-dark" style="color:rgb(255,255,255);background-color:#313131">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">คลินิก</th>
                                        <th scope="col">เจ้าของ</th>
                                        <th scope="col">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(l, index) in owner_list">
                                    <tr>
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ l.eventCategory.eventCategoryName }}</td>
                                        <td>{{ l.user.name }}</td>
                                        <td><button @click="remove(l.eventCategory.id, l.user.id, index)"
                                                class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal"
                                                data-bs-target="#myModal" style="--bs-btn-border-radius: 1rem">
                                                ลบ
                                            </button>
                                        </td>
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