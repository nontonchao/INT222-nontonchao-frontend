<script setup>
import { onBeforeMount, ref } from 'vue';
import { useUsers } from '../stores/users.js';
import { useRoute } from 'vue-router';

const userStore = useUsers();
const route = useRoute();
const thisUser = ref({});


onBeforeMount(async () => {
  thisUser.value = await userStore.getUserById(route.params.user_id);
});



</script>
<template>
  <div>
    <section class="position-relative py-4 py-xl-5" style="background: #f5f5f7">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav
          class="navbar navbar-light navbar-expand-md py-3"
          style="margin: 2px"
        >
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"
              ><span class="fw-bold">ข้อมูลผู้ใช้งาน</span></a
            >
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto"></ul>
            </div>
          </div>
        </nav>
      </section>
      <div class="container">
        <h1 class="fw-bold mb-4 display-10" style="margin: 100px">
          OASIP ID
        </h1>
        <div class="container position-relative">
          <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-4 col-xl-4">
              <div
                class="d-flex flex-column justify-content-center align-items-start h-100"
              >
                <div class="d-flex align-items-center p-3">
                  <img
                    src="../assets/testimg.png"
                    class="rounded img-fluid rounded-circle float-start w-100"
                  />
                </div>
                <div>
                  <p class="px-4 fw-bold text-primary mb-0">ชื่อ</p>
                  <p class="px-4 text-muted mb-5">{{thisUser.name}}</p>
                  <p class="px-4 fw-bold text-primary mb-0">อีเมล</p>
                  <p class="px-4 text-muted mb-0">{{thisUser.email}}</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 col-xl-4 m-5 p-5">
              <div>
                <p class="px-4 fw-bold text-primary mb-0">สถานะภาพ</p>
                <p class="px-4 text-muted mb-5">{{thisUser.role}}</p>
                <p class="px-4 fw-bold text-primary mb-0">วันที่สร้างไอดี</p>
                <p class="px-4 text-muted mb-5">{{thisUser.onCreated}}</p>
                <p class="px-4 fw-bold text-primary mb-0">อัพเดทล่าสุดเมื่อ</p>
                <p class="px-4 text-muted mb-0">{{thisUser.onUpdated}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight">
          <!-- <button
            class="btn btn-danger btn-sm"
            type="button"
            style="--bs-btn-border-radius: 1rem"
          >
            ยกเลิกนัดหมาย
          </button> -->
          <button
            class="btn btn-primary btn-sm mx-4"
            type="button"
            style="--bs-btn-border-radius: 1rem"
          >
            แก้ไข
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
