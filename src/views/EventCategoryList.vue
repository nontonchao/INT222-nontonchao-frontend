<script setup>
import { onBeforeMount, ref } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useRouter } from "vue-router";

const router = useRouter();
const eventCateStore = useEventCategory();
const cateList = ref([]);
const selectedCate = ref({
  eventCategoryName: "",
  eventDuration: "",
  eventCategoryDescription: "",
});
const selectedCateNotEditable = ref({
  eventCategoryName: "",
  eventDuration: "",
  eventCategoryDescription: "",
});
const toggleEdit = ref(false);

onBeforeMount(async () => {
  await eventCateStore.getEventCategoryList();
  cateList.value = eventCateStore.eventCategoryList;
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

      <section class="position-relative py-4 py-xl-5" v-show="!toggleEdit">
        <div class="container py-4 py-xl-5">
          <div class="row gy-4 row-cols-2 row-cols-md-5">
            <div
              class="col scale"
              v-for="(cate, index) in cateList"
              :key="index"
              @click="selectedCate = cate;selectedCateNotEditable = cate"
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
          v-show="selectedCate.eventCategoryName != '' && !toggleEdit"
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
              required
              id="floatingInput"
              placeholder="ชื่อคลินิก"
              minlength="1"
              maxlength="50"
              v-model="selectedCate.eventCategoryName"
              @keyup="eventCateStore.isNotUnique(selectedCateNotEditable)"
            />
            <label for="floatingInput">ชื่อคลินิก</label>
            <p v-show="eventCateStore.isNotUnique(selectedCateNotEditable)">
              *ชื่อซ้ำกับคลินิกอื่น
            </p>
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
              type="number"
              class="form-control"
              id="floatingInput"
              required
              placeholder="ระยะเวลา"
              min="1"
              max="480"
              v-model="selectedCate.eventDuration"
            />
            <label for="floatingInput">ระยะเวลา</label>
            <!-- div col เปล่าหลอก ๆ -->
          </div>
          <div class="col"></div>
          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="คำอธิบาย"
              v-model="selectedCate.eventCategoryDescription"
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
            @click="toggleEdit = !toggleEdit"
          >
            ยกเลิก
          </button>
          <button
            class="btn btn-primary btn-sm mx-4"
            type="button"
            :disabled="
              !(
                selectedCate.eventDuration > 1 &&
                selectedCate.eventDuration < 480 &&
                !selectedCate.eventCategoryName.length == '' &&
                !eventCateStore.isNotUnique(selectedCateNotEditable)
              )
            "
            style="--bs-btn-border-radius: 1rem"
            data-bs-toggle="modal"
            data-bs-target="#confirmEditCate"
          >
            ยืนยัน
          </button>
        </div>
      </div>
      <!-- หลังกดแก้ไข -->
    </div>
  </div>

  <div id="confirmEditCate" class="modal fade">
    <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header flex-column">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-hidden="true"
          ></button>
          <div class="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              class="bi bi-exclamation"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
          </div>

          <h4 class="modal-title w-100">คุณต้องการจะแก้ไขข้อมูล ?</h4>
        </div>
        <div class="modal-body">
          <p>คุณต้องการจะแก้ไขข้อมูลเกี่ยวกับคลินิกนี้หรือไม่</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-primary rounded-pill"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            @click="
              eventCateStore.editEventCategory(selectedCate);
              toggleEdit = !toggleEdit;
            "
          >
            ยืนยัน
          </button>
          <button
            type="button"
            class="btn btn-danger rounded-pill"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            ยกเลิก
          </button>
        </div>
      </div>
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

body {
  font-family: "Varela Round", sans-serif;
}

.modal-confirm {
  color: #636363;
  width: 500px;
}

.modal-confirm .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 14px;
}

.modal-confirm .modal-header {
  border-bottom: none;
  position: relative;
}

.modal-confirm h4 {
  text-align: center;
  font-size: 26px;
  margin: 30px 500px -20px;
}

.modal-confirm .close {
  position: absolute;
  top: -5px;
  right: -2px;
}

.modal-confirm .modal-body {
  color: #999;
}

.modal-confirm .modal-footer {
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  padding: 10px 15px 25px;
}

.modal-confirm .modal-footer a {
  color: #999;
}

.modal-confirm .icon-box {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  z-index: 9;
  text-align: center;
  border: 4px solid rgb(250, 231, 62);
}

.modal-confirm .icon-box i {
  color: #f15e5e;
  font-size: 46px;
  display: inline-block;
  margin-top: 13px;
}

.modal-confirm .btn,
.modal-confirm .btn:active {
  color: #fff;
  border-radius: 4px;
  background: #0071e3;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  min-width: 120px;
  border: none;
  min-height: 40px;
  border-radius: 3px;
  margin: 0 5px;
}

.modal-confirm .btn-secondary {
  background: #f5f5f7;
}

.modal-confirm .btn-secondary:hover,
.modal-confirm .btn-secondary:focus {
  background: #a8a8a8;
}

.modal-confirm .btn-danger {
  background: #f15e5e;
}

.modal-confirm .btn-danger:hover,
.modal-confirm .btn-danger:focus {
  background: #ee3535;
}
</style>
