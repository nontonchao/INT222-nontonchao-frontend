<script setup>
import { onBeforeMount, ref } from "vue";
import { useEvents } from "../stores/events.js";
import { useUsers } from "../stores/users";

const props = defineProps({
  clinic_list: {
    type: Object,
    require: true,
    default: {},
  },
});

var d = new Date();
d.setHours(0, 0, 0, 0);

const getTime = (time) => {
  return (
    String(time.getHours()).padStart(2, "0") +
    ":" +
    String(time.getMinutes()).padStart(2, "0")
  );
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const timeTable = ref([]);

const generateTimeSlot = (eventDuration) => {
  timeTable.value.length = 0;
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
const userStore = useUsers();
const name = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const clinicX = ref("");
const note = ref("");
const startTime = ref("");
const time = ref("");
const toSend = ref("");
const selectClinic = ref({});
const activeIndex = ref();

const getCurrDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${numberFormat(
    new Date(today.toString()).getMonth() + 1,
    2
  )}-${numberFormat(new Date(today.toString()).getDate(), 2)}T${today
    .toLocaleTimeString("it-IT")
    .substring(0, 5)}`;
};

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
    eventStartTime:
      new Date(startTime.value)
        .toISOString()
        .replace(".000Z", "Z")
        .split("T")[0] +
      "T" +
      time.value +
      ":00.000+07:00",
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

const numberFormat = function (number, width) {
  return new Array(+width + 1 - (number + "").length).join("0") + number;
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
                  generateTimeSlot(cateList.eventDuration);
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
                    class="form-control mt-3"
                    placeholder="อีเมล"
                    v-model="email"
                  />
                  <p class="fs-6 text-danger text-right" v-if="emailErr == 2">
                    กรุณาใส่อีเมลให้ถูกต้อง
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
              />
            </div>
            <div>
              <!-- 1440 = นาทีใน 1 วัน ต้องเอา duration ของ category นั้นๆมา + 5 นาทีแล้วหาร จะได้สลอตเวลามา -->
              <div class="container text-center" v-show="startTime.length > 0">
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
                      "
                      :class="activeClick(index)"
                      :activeIndex="index"
                      class="btn-sm"
                    >
                      {{ x }}
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
            style="--bs-btn-border-radius: 1rem"
            @click="addEvent()"
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.list-group {
  max-height: 300px;
}
</style>
