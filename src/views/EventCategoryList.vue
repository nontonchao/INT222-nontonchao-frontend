<script setup>
import { onBeforeMount, ref } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";
import { useLogin } from "../stores/login.js";
import { useUsers } from "../stores/users.js";
const users = ref([]);
const userStore = useUsers();
const selected_user = ref([]);

const loginStore = useLogin();
const eventCateStore = useEventCategory();
const cateList = ref([]);
const selectedCate = ref({
  eventCategoryName: "",
  eventDuration: "",
  eventCategoryDescription: "",
  eventCategoryStatus: 1,
  owners: [""],
});
const selectedCateNotEditable = ref({
  eventCategoryName: "",
  eventDuration: "",
  eventCategoryDescription: "",
});
const toggleEdit = ref(false);
const edited = ref(false);

onBeforeMount(async () => {

  await eventCateStore.getEventCategoryList();
  if (loginStore.roles === 'ROLE_ADMIN') {
    users.value = await userStore.fetchLecturers();
  }
  cateList.value = eventCateStore.eventCategoryList;
});

function test() {
  setTimeout(function () {
    edited.value = false;
  }, 2500);
}

const editCategory = async () => {
  if (loginStore.roles === "ROLE_ADMIN") {
    add(selectedCate.value.id, selected_user.value);
    eventCateStore.editEventCategory(selectedCate.value);
  } else {
    eventCateStore.editEventCategory(selectedCate.value);
  }
};
const add = async (c, u) => {
  if (c != undefined && u != undefined) {
    const status = await eventCateStore.addEventCategoryOwners(c, u);
    if (status === 201) {
    } else {
      alert("error while adding");
    }
  } else {
    alert("select first!");
  }
};

function topFunc() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function listUser() {
  selected_user.value = [];
  selectedCate.value.owners.forEach((element) => {
    selected_user.value.push(element.user_id);

  });
}
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #ffffff">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"><span class="fw-bold">คลินิกทั้งหมด</span></a>
            <div class="collapse navbar-collapse" id="navcol-2"></div>
          </div>
        </nav>
      </section>
      <Transition>
        <section class="border bottom-dark" id="resFile" style="background: #0071e3" v-show="edited">
          <nav class="navbar navbar-light" style="margin: 2px">
            <div class="px-5 container align-items-center">
              <h6 class="fw-bold px-5 mt-2" style="color: #ffffff">
                แก้ไขข้อมูลเกี่ยวกับคลินิกของคุณเรียบร้อยแล้ว
              </h6>
              <ul class="navbar-nav ms-auto">
                <button type="button" class="btn-close px-5" data-bs-dismiss="modal" aria-label="Close"></button>
              </ul>
            </div>
          </nav>
        </section>
      </Transition>
    </section>

    <div class="container py-4 py-xl-5">
      <div class="row mb-5">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h2>คลินิกทั้งหมด</h2>
          <p class="w-lg-50">ที่พร้อมจะให้คำปรึกษากับคุณแบบเฉพาะด้าน<br /></p>
        </div>
      </div>

      <section class="position-relative py-4 py-xl-5" style="cursor: pointer" v-show="!toggleEdit">
        <div class="container py-4 py-xl-5">
          <div class="row gy-4 row-cols-2 row-cols-md-5">
            <div class="col scale" v-for="(cate, index) in cateList" :key="index" @click="
  selectedCate = cate;
listUser();
selectedCateNotEditable = cate;
            ">
              <div class="text-center d-flex flex-column justify-content-center align-items-center py-4">
                <div
                  class="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon lg">
                  <img class="card-img-top w-auto d-block fit-cover rounded" style="height: 200px"
                    src="../assets/testimg.png" />
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
        <div class="container position-relative" v-show="selectedCate.eventCategoryName != '' && !toggleEdit">
          <div class="row d-flex justify-content-left">
            <div class="row row-cols-2">
              <h4 class="fw-bold">{{ selectedCate.eventCategoryName }}</h4>
              <div class="col"></div>
              <p>
                อาจารย์ที่ปรึกษา:
                <span v-for="lec in selectedCate.owners" :key="lec.user_id">{{ lec.name + " " }}
                </span>
              </p>
              <div class="col"></div>
              <p>ระยะเวลา: {{ selectedCate.eventDuration }}</p>
              <div class="col"></div>
              <p>คำอธิบาย: {{ selectedCate.eventCategoryDescription }}</p>
              <div class="col"></div>
              <div>
                <p>
                  ติดต่ออาจารย์ที่ปรึกษาผ่านช่องทางอีเมล:
                <div v-for="lec in selectedCate.owners" class="mt-2">
                  <a :href="'mailto: ' + lec.email" style=" text-decoration: none !important; padding-top: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                      class="bi bi-envelope-at ee-ee " viewBox="0 0 16 16">
                      <path
                        d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path
                        d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                    <small style="padding-left:10px;">{{ lec.name }}</small></a>
                </div>
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex flex-row-reverse bd-highlight" v-if="
            (loginStore.roles == 'ROLE_LECTURER' &&
              JSON.stringify(selectedCate.owners).includes(
                loginStore.name
              )) ||
            loginStore.roles == 'ROLE_ADMIN'
          ">
            <button class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem"
              @click="toggleEdit = !toggleEdit">
              แก้ไข
            </button>
          </div>
          <div v-else>
            <!-- nothing -->
          </div>
        </div>
      </section>
      <!-- ก่อนกดแก้ไข -->

      <!-- หลังกดแก้ไข -->
      <div v-show="toggleEdit">

        <div class="row row-cols-2">
          <div class="form-floating mb-3 col">
            <input type="text" class="form-control" required id="floatingInput" placeholder="ชื่อคลินิก" minlength="1"
              maxlength="50" v-model="selectedCate.eventCategoryName"
              @keyup="eventCateStore.isNotUnique(selectedCateNotEditable)" />
            <label for="floatingInput">ชื่อคลินิก</label>
            <p v-show="eventCateStore.isNotUnique(selectedCateNotEditable)">
              *ชื่อซ้ำกับคลินิกอื่น
            </p>
          </div>
          <!-- div col เปล่าหลอก ๆ -->
          <div class="d-flex flex-row-reverse  justify-content-center">
            <label class="toggle m-2">
              <input type="checkbox" :checked="selectedCate.eventCategoryStatus == 1"
                @click="selectedCate.eventCategoryStatus = selectedCate.eventCategoryStatus == 1 ? 0 : 1">
              <span class="slider"></span>
              <span class="labels" data-off="ปิด" data-on="เปิด"></span>
            </label>
            <p class=" m-2"> สถานะของคลินิก: </p>
          </div>
          <div class="form-floating mb-3">
            <p>อาจารย์ที่ปรึกษา:</p>
            <!-- div col เปล่าหลอก ๆ -->
          </div>
          <div class="col"></div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="floatingInput" required placeholder="ระยะเวลา" min="1"
              max="480" v-model="selectedCate.eventDuration" />
            <label for="floatingInput">ระยะเวลา</label>
            <!-- div col เปล่าหลอก ๆ -->
          </div>
          <div class="col"></div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="คำอธิบาย" v-model="selectedCate.eventCategoryDescription"
              id="floatingTextarea" style="height: 100px"></textarea>
            <label for="floatingTextarea">คำอธิบาย</label>
          </div>
          <!-- ****************for admin*********************** -->
          <div class="col"></div>
          <div class="form-floating mb-3 mt-3" v-if="loginStore.roles == 'ROLE_ADMIN'">
            <p>เพิ่มอาจารย์ที่ปรึกษา</p>
            <div class="form-check" v-for="(e, index) in users" :key="index" :value="e.id">
              <input class="form-check-input" type="checkbox" :value="e.id" :id="'flexCheckIndeterminate' + index"
                v-model="selected_user" />
              <label class="form-check-label" for="flexCheckIndeterminate">
                {{ e.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight" v-show="toggleEdit">
          <button class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem"
            @click="toggleEdit = !toggleEdit">
            ยกเลิก
          </button>
          <button class="btn btn-primary btn-sm mx-4" type="button" :disabled="
            !(
              selectedCate.eventDuration > 1 &&
              selectedCate.eventDuration < 480 &&
              !selectedCate.eventCategoryName.length == '' &&
              !eventCateStore.isNotUnique(selectedCateNotEditable)
              && !selected_user.length < 1)
          " style="--bs-btn-border-radius: 1rem" data-bs-toggle="modal" data-bs-target="#confirmEditCate">
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-exclamation"
              viewBox="0 0 16 16">
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          </div>

          <h4 class="modal-title w-100">คุณต้องการจะแก้ไขข้อมูล ?</h4>
        </div>
        <div class="modal-body">
          <p>คุณต้องการจะแก้ไขข้อมูลเกี่ยวกับคลินิกนี้หรือไม่</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-dismiss="modal"
            @click="
              toggleEdit = !toggleEdit;
            topFunc();
            edited = true;
            test();
            editCategory()">
            ยืนยัน
          </button>
          <button type=" button" class="btn btn-danger rounded-pill" data-bs-toggle="modal" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* css for Status switch */
.toggle {
  --width: 80px;
  --height: calc(var(--width) / 3);

  position: relative;
  display: inline-block;
  width: var(--width);
  height: var(--height);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: var(--height);
  cursor: pointer;
}

.toggle input {
  display: none;
}

.toggle .slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--height);
  background-color: #ccc;
  transition: all 0.4s ease-in-out;
}

.toggle .slider::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: calc(var(--height));
  height: calc(var(--height));
  border-radius: calc(var(--height) / 2);
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease-in-out;
}

.toggle input:checked+.slider {
  background-color: #0071e3;
}

.toggle input:checked+.slider::before {
  transform: translateX(calc(var(--width) - var(--height)));
}

.toggle .labels {
  position: absolute;
  top: 2px;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 15px;
  transition: all 0.4s ease-in-out;
}

.toggle .labels::after {
  content: attr(data-off);
  position: absolute;
  right: 5px;
  color: #4d4d4d;
  opacity: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease-in-out;
}

.toggle .labels::before {
  content: attr(data-on);
  position: absolute;
  left: 5px;
  color: #ffffff;
  opacity: 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease-in-out;
}

.toggle input:checked~.labels::after {
  opacity: 0;
}

.toggle input:checked~.labels::before {
  opacity: 1;
}

/* css for Status switch */
.ee-ee {
  cursor: pointer;
}

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
