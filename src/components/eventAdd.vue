<script setup>
import { onBeforeMount, ref } from "vue";
import { useEvents } from "../stores/events.js";
import { useRouter } from "vue-router";
import { useLogin } from "../stores/login.js";

const loginStore = useLogin();

const props = defineProps({
  clinic_list: {
    type: Object,
    require: true,
    default: {},
  },
});

var d = new Date();
d.setHours(0, 0, 0, 0);
var d_tmp = ref(new Date());

const getTime = (time) => {
  return time;
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const slot = ref([]);
const ecId = ref(0);

const checkTimeSlot = async (date, eventCategoryId) => {
  slot.value.length = 0;
  const slot_t = await eventStore.getTime(date, eventCategoryId);
  slot_t.forEach((x) => {
    slot.value.push(new Date(x.eventStartTime).toString());
  });
};

const timeTable = ref([]);

const generateTimeSlot = (eventDuration) => {
  timeTable.value.length = 0;
  d = new Date(
    startTime.value.split("-")[0] +
      "-" +
      startTime.value.split("-")[1] +
      "-" +
      startTime.value.split("-")[2]
  );
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 1440 / (eventDuration + 5); i++) {
    timeTable.value.push(
      getTime(d) + " - " + getTime((d = addMinutes(d, eventDuration)))
    );
    d = addMinutes(d, 5);
  }
};

const activeClick = (id) => {
  if (id === activeIndex.value) {
    return "btn btn-outline-danger btn-sm m-2 active";
  } else {
    return "btn btn-outline-danger btn-sm m-2";
  }
};

const eventStore = useEvents();
const router = useRouter();

const name = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const clinicX = ref("");
const note = ref("");

const time = ref("");
const toSend = ref("");
const selectClinic = ref({});
const activeIndex = ref();
const duration = ref();

const numberFormat = function (number, width) {
  return new Array(+width + 1 - (number + "").length).join("0") + number;
};

const getCurrDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${numberFormat(
    new Date(today.toString()).getMonth() + 1,
    2
  )}-${numberFormat(new Date(today.toString()).getDate(), 2)}`;
};
const startTime = ref(getCurrDate());

const getClinic = (clinicName) => {
  selectClinic.value = props.clinic_list.filter(
    (x) => x.eventCategoryName == clinicName
  )[0];
};

const addEvent = async () => {
  toSend.value = {
    // bookingName: name.value,
    bookingName: firstname.value.trim() + " " + lastname.value.trim(),
    bookingEmail: email.value.trim(),
    // eventStartTime:
    //   new Date(startTime.value)
    //     .toISOString()
    //     .replace(".000Z", "Z")
    //     .split("T")[0] +
    //   "T" +
    //   time.value +
    //   ":00.000+07:00",
    eventStartTime: d_tmp.value,
    eventDuration: JSON.stringify(
      props.clinic_list.filter((x) => x.eventCategoryName === clinicX.value)[0]
        .eventDuration
    ),
    eventNotes: note.value,
    eventCategory: {
      id: JSON.stringify(
        props.clinic_list.filter(
          (x) => x.eventCategoryName === clinicX.value
        )[0].id
      ),
    },
  };
  eventStore.addEvent(toSend.value);
  if (eventStore.statusCode == 200) {
    console.log("event added :)");
  }
};

const emailErr = ref(0);
const ValidateEmail = (mail) => {
  return mail == ""
    ? (emailErr.value = 0)
    : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        mail
      )
    ? (emailErr.value = 1)
    : (emailErr.value = 2);
};

onBeforeMount(() => {
  if (loginStore.isLoggedIn == true) {
    firstname.value = loginStore.name.split(" ")[0];
    lastname.value = loginStore.name.split(" ")[1];
    email.value = loginStore.email;
    ValidateEmail(email.value);
  }
});
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #ffffff">
      <div class="container py-4 py-xl-5">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
            style="margin: 60px"
          >
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">จองนัดหมาย</h2>
              <p class="my-3">
                คุณสามารถจองนัดหมายตามขั้นตอนดังนี้<br />1.
                เลือกคลินิกที่ต้องการ<br />2. กรอกข้อมูลผู้นัดหมาย<br />3.
                เลือกวันและเวลาที่สะดวก<br />4.
                ยินดีด้วยการนัดหมายของคุณสำเร็จแล้ว!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5" style="background: #f5f5f7">
        <div class="row gy-4 gy-md-0">
          <div class="col-md-6 p-5">
            <div
              class="form-check"
              v-for="(cateList, index) in clinic_list"
              :key="cateList.id"
            >
              <input
                v-model="clinicX"
                @change="
                  getClinic(clinicX);
                  ecId = cateList.id;
                  duration = cateList.eventDuration;
                  generateTimeSlot(cateList.eventDuration);
                  checkTimeSlot(startTime, ecId);
                "
                class="form-check-input"
                type="radio"
                required
                name="flexRadioDefault"
                :value="cateList.eventCategoryName"
              />
              <label class="form-check-label">
                {{ cateList.eventCategoryName }}
                <small class="text-muted"
                  >({{ cateList.eventDuration }} นาที)</small
                >
              </label>
            </div>
          </div>
          <div class="col-md-6 d-md-flex align-items-md-center">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 1</h2>
              <p class="my-3">เลือกคลินิกที่ต้องการได้เลย :)</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5" v-show="clinicX">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
          >
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 2</h2>
              <p class="my-3">บอกเราหน่อยว่าใครกำลังนัดหมาย :)</p>
            </div>
          </div>
          <div class="col-md-6 form-floating">
            <form class="mt-1">
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ชื่อ"
                    maxlength="100"
                    required
                    v-model="firstname"
                    :disabled="loginStore.isLoggedIn"
                  />
                  <div class="text-wrap">
                    <p
                      class="fs-6 text-danger text-right"
                      v-show="firstname.length == 100"
                    >
                      ชื่อไม่เกิน 100 ตัวอักษร
                    </p>
                  </div>
                </div>
                <div class="col">
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="นามสกุล"
                    maxlength="50"
                    v-model="lastname"
                    :disabled="loginStore.isLoggedIn"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    required
                    minlength="1"
                    maxlength="100"
                    @keyup="ValidateEmail(email)"
                    :disabled="loginStore.isLoggedIn"
                    class="form-control mt-3"
                    placeholder="อีเมล"
                    v-model="email"
                  />
                  <p class="text-danger text-end fs-6" v-if="emailErr == 2">
                    *กรุณาใส่อีเมลให้ถูกต้อง
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="container py-4 py-xl-5"
        style="background: #f5f5f7"
        v-show="clinicX && firstname != 0 && lastname != 0 && emailErr == 1"
      >
        <div class="row gy-4 gy-md-0">
          <div class="col-md-6">
            <div class="m-5">
              <input
                type="date"
                class="form-control"
                v-model="startTime"
                required
                :min="getCurrDate()"
                @change="
                  checkTimeSlot(startTime, ecId);
                  generateTimeSlot(duration);
                "
              />
            </div>
            <div>
              <!-- 1440 = นาทีใน 1 วัน ต้องเอา duration ของ category นั้นๆมา + 5 นาทีแล้วหาร จะได้สลอตเวลามา -->
              <div
                class="container text-center"
                v-show="startTime.length > 0 && getCurrDate() <= startTime"
              >
                <div class="panel-body my-5 text-center">
                  <div class="row row-cols-5 list-group list-group-item">
                    <button
                      type="button"
                      v-for="(x, index) in timeTable"
                      :key="index"
                      @click="
                        time = timeTable[index].split('-')[0].trim();
                        activeIndex = index;
                        activeClick(index);
                        d_tmp = new Date(x.split('-')[0].trim()).toISOString();
                      "
                      :class="activeClick(index)"
                      :disabled="
                        slot.includes(x.split('-')[0].trim()) ||
                        new Date(x.split('-')[0]) < new Date()
                      "
                      :activeIndex="index"
                      class="'btn-sm'"
                    >
                      {{
                        new Date(x.split("-")[0])
                          .toLocaleTimeString("it-IT")
                          .substring(0, 5)
                      }}
                      -
                      {{
                        new Date(x.split("-")[1])
                          .toLocaleTimeString("it-IT")
                          .substring(0, 5)
                      }}
                      <small v-if="slot.includes(x.split('-')[0].trim())"
                        >เวลานี้ถูกจองแล้ว</small
                      >
                      <small
                        v-if="new Date(x.split('-')[0].trim()) < new Date()"
                        >หมดเวลาจอง</small
                      >
                    </button>
                  </div>
                </div>
              </div>
              <div class="col m-5">
                <textarea
                  rows="4"
                  class="form-control mt-3"
                  placeholder="อยากบอกอะไรกับที่ปรึกษาไหม?"
                  maxlength="300"
                  v-model="note"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 d-md-flex align-items-md-center">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 3</h2>
              <p class="my-3">สะดวกเข้าคลินิกวันไหนล่ะ :D</p>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight px-5">
          <button
            class="btn btn-danger btn-sm"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            style="--bs-btn-border-radius: 1rem"
            :disabled="!(time != 0 && startTime != 0) "          >
            ยืนยันการจอง
          </button>
        </div>
      </div>

      <!-- Modal HTML -->
      <div id="myModal" class="modal fade">
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
                  fill="#6E6E73"
                  class="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                  />
                </svg>
              </div>

              <h4 class="modal-title w-100">คุณต้องการสร้างนัดหมายของคุณ ?</h4>
              <div class="modal-body">
                <p>
                  คุณต้องการที่จะนัดหมายเพื่อขอคำปรึกษาคลินิก....เวลา....ใช่หรือไม่
                </p>
              </div>
              <div class="modal-footer justify-content-center">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  class="btn btn-primary rounded-pill"
                  data-dismiss="modal"
                  @click="
                    addEvent();
                    router.push(`/check-event`);
                  "
                >
                  ยืนยัน
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  class="btn btn-danger rounded-pill"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.list-group {
  max-height: 300px;
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
  border: 4px solid #68cc45;
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
