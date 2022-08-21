<script setup>
import { onBeforeMount, ref } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useRouter } from "vue-router";

const EventCateStore = useEventCategory();
const cateList = ref([]);
const selectedCate = ref({
  eventCategoryName: "",
  eventDuration: "",
  eventCategoryDescription: "",
});
const toggleEdit = ref(false);

onBeforeMount(async () => {
  await EventCateStore.getEventCategoryList();
  cateList.value = EventCateStore.eventCategoryList;
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
              ><span class="fw-bold">คลินิกทั้งหมด</span></a
            >
            <div class="collapse navbar-collapse" id="navcol-2"></div>
          </div>
        </nav>
      </section>
    </section>

    <div class="container py-4 py-xl-5">
      <div class="row mb-5">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h2>คลินิกทั้งหมด</h2>
          <p class="w-lg-50">ที่พร้อมจะให้คำปรึกษากับคุณแบบเฉพาะด้าน<br /></p>
        </div>
      </div>

      <section class="position-relative py-4 py-xl-5">
        <div class="container py-4 py-xl-5">
          <div class="row gy-4 row-cols-2 row-cols-md-5">
            <div
              class="col scale"
              v-for="(cate, index) in cateList"
              :key="index"
              @click="selectedCate = cate"
            >
              <div
                class="text-center d-flex flex-column justify-content-center align-items-center py-4"
              >
                <div
                  class="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon lg"
                >
                  <img
                    class="card-img-top w-auto d-block fit-cover rounded"
                    style="height: 200px"
                    src="../assets/testimg.png"
                  />
                </div>
                <div class="px-3 py-5">
                  <p class="fw-bold mb-0">{{ cate.eventCategoryName }}</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ก่อนกดแก้ไข -->
      <section class="position-relative">
        <div
          class="container position-relative"
          v-show="selectedCate.eventCategoryName != ''"
        >
          <div class="row d-flex justify-content-left">
            <div class="row row-cols-2">
              <h4 class="fw-bold">{{ selectedCate.eventCategoryName }}</h4>
              <div class="col"></div>
              <p>อาจารย์ที่ปรึกษา: {{}}</p>
              <div class="col"></div>
              <p>ระยะเวลา: {{ selectedCate.eventDuration }}</p>
              <div class="col"></div>
              <p>คำอธิบาย: {{ selectedCate.eventCategoryDescription }}</p>
            </div>
          </div>
          <div class="d-flex flex-row-reverse bd-highlight">
            <button
              class="btn btn-danger btn-sm"
              type="button"
              style="--bs-btn-border-radius: 1rem"
              @click="toggleEdit = !toggleEdit"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </section>
      <!-- ก่อนกดแก้ไข -->

      <!-- หลังกดแก้ไข -->
      <div v-show="toggleEdit">
        <div class="row row-cols-2">
          <div class="form-floating mb-3 col">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ชื่อคลินิก"
            />
            <label for="floatingInput">ชื่อคลินิก</label>
          </div>
          <!-- div col เปล่าหลอก ๆ -->
          <div class="col"></div>
          <div class="form-floating mb-3">
            <p>อาจารย์ที่ปรึกษา: {{}}</p>
            <!-- div col เปล่าหลอก ๆ -->
          </div>
          <div class="col"></div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ระยะเวลา"
            />
            <label for="floatingInput">ระยะเวลา</label>
            <!-- div col เปล่าหลอก ๆ -->
          </div>
          <div class="col"></div>
          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="คำอธิบาย"
              id="floatingTextarea"
              style="height: 100px"
            ></textarea>
            <label for="floatingTextarea">คำอธิบาย</label>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight" v-show="toggleEdit">
          <button
            class="btn btn-danger btn-sm"
            type="button"
            style="--bs-btn-border-radius: 1rem"
          >
            ยกเลิก
          </button>
          <button
            class="btn btn-primary btn-sm mx-4"
            type="button"
            style="--bs-btn-border-radius: 1rem"
          >
            ยืนยัน
          </button>
        </div>
      </div>
      <!-- หลังกดแก้ไข -->
    </div>
  </div>
</template>

<style scoped>
.form-select,
.form-control {
  border: none;
  border-bottom: 1px solid #000000;
  border-radius: 5;
}
.form-select:focus,
.form-control:focus {
  box-shadow: none;
  border-bottom-color: #2196f3;
}
.scale:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 0.15rem rgb(129, 128, 128));
}
</style>
