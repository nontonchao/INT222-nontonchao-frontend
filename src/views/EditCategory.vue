<script setup>
import { ref, onBeforeMount } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useLogin } from "../stores/login.js";
import { useUsers } from "../stores/users.js";

const owner_list = ref([]);
const category = ref([]);
const users = ref([]);
const categoryStore = useEventCategory();
const userStore = useUsers();
const loginStore = useLogin();
const selected_clinic = ref();
const selected_user = ref();

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
    alert("error while delete");
  }
};

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
      alert("added successfully!");
    } else {
      alert("error while adding");
    }
  } else {
    alert("select first!");
  }
};
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
              ><span class="fw-bold">จัดการคลินิก</span></a
            >
          </div>
        </nav>
      </section>

      <div class="container pt-5">
        <div>
          <!-- category manage -->
          <div v-if="loginStore.isAdmin">
            <div>
              <table class="table">
                <thead
                  class="thead-dark"
                  style="color: rgb(255, 255, 255); background-color: #313131"
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">คลินิก</th>
                    <th scope="col">เจ้าของ</th>
                    <th scope="col">แก้ไข</th>
                  </tr>
                </thead>
                <tbody v-for="(l, index) in owner_list">
                  <tr>
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ l.eventCategory.eventCategoryName }}</td>
                    <td>{{ l.user.name }}</td>
                    <td @click="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill ee-ee"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- add ******************************************** -->
              <select
                v-model="selected_clinic"
                class="form-select form-select-sm"
              >
                <option disabled value="">คลินิก</option>
                <option
                  v-for="(e, index) in category"
                  :key="index"
                  :value="e.id"
                >
                  {{ e.eventCategoryName }}
                </option>
              </select>
              <select
                v-model="selected_user"
                class="form-select form-select-sm"
              >
                <option disabled value="">ผู้ใช้</option>
                <option v-for="(e, index) in users" :key="index" :value="e.id">
                  {{ e.name }}
                </option>
              </select>
              <button
                @click="add(selected_clinic, selected_user)"
                type="button"
                class="btn btn-danger"
                style="margin-bottom: 10px; float: right"
              >
                เพิ่ม
              </button>
              <!-- add -->

              <table class="table">
                <thead
                  class="thead-dark"
                  style="color: rgb(255, 255, 255); background-color: #313131"
                >
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
                    <td>
                      <button
                        @click="remove(l.eventCategory.id, l.user.id, index)"
                        class="btn btn-danger btn-sm"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        style="--bs-btn-border-radius: 1rem"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else>ไม่มีสิทธิ์เข้าถึงหน้านี้</div>
          <!-- category manage -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ee-ee {
  cursor: pointer;
}
</style>
