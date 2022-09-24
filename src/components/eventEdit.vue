<script setup>
import { ref } from "vue";
import { useEvents } from "../stores/events.js";
import { useRouter } from "vue-router";
const router = useRouter();
const useEvent = useEvents();
const startTime = ref("");
const time = ref("");
const activeIndex = ref("");
const eNotes = ref(props.eventz.eventNotes);
const props = defineProps({
  eventz: {
    type: Object,
    require: true,
    default: {},
  },
});
let toEdit = props.eventz;

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

var d = new Date();
d.setHours(0, 0, 0, 0);
var d_tmp = ref(new Date());

const getTime = (time) => {
  return time;
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

var d = new Date();
d.setHours(0, 0, 0, 0);
const slot = ref([]);

const checkTimeSlot = async (date, eventCategoryId) => {
  slot.value.length = 0;
  const slot_t = await useEvent.getTime(date, eventCategoryId);
  slot_t.forEach((x) => {
    slot.value.push(new Date(x.eventStartTime).toString());
  });
};

const timeTable = ref([]);

const generateTimeSlot = (eventDuration) => {
  console.log(eventDuration);
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

const editEvent = async () => {
  toEdit = {
    eventStartTime: d_tmp.value,
    eventNotes: eNotes.value,
  };
  await useEvent.editEvent(props.eventz.id, toEdit);
  1;
};
</script>
<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #ffffff">
      <div class="container py-4 py-xl-5">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
            style="margin: 60px">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">แก้ไขการนัดหมาย</h2>
              <p class="my-3">
                คุณสามารถแก้นัดหมายของคุณได้ เพียงแค่ 1 ขั้นตอน เลือกวัน
                และช่วงเวลาที่ต้องการนัดหมายใหม่
                หากคุณต้องการแก้ไขรายละเอียดก็สามารถทำได้เช่นกัน
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5" style="background: #f5f5f7">
        <div class="row gy-4 gy-md-0 justify-content-center">
          <div class="col-md-3 p-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" disabled checked />
              {{ eventz.eventCategory.eventCategoryName }}
              <label class="form-check-label">
                <small class="text-muted">({{ eventz.eventCategory.eventDuration }} นาที)</small>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-3 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
          </div>
          <div class="col-md-6 form-floating">
            <form class="mt-1">
              <div class="row">
                <div class="col">
                  <p>
                    <strong>Firstname: </strong>{{ eventz.bookingName.split(" ")[0] }}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <strong>Lastname: </strong>{{ eventz.bookingName.split(" ")[1] }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p><strong>Email: </strong>{{ eventz.bookingEmail }}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="container py-3 py-xl-4" style="background: #f5f5f7">
        <div class="row gy-4 gy-md-0">
          <div class="col-md-6">
            <div class="m-5">
              <input type="date" class="form-control" v-model="startTime" required :min="getCurrDate()" @change="
                checkTimeSlot(startTime, toEdit.eventCategory.id);
                generateTimeSlot(toEdit.eventDuration);
              " />
            </div>
            <div>
              <div class="container text-center" v-show="startTime.length > 0 && getCurrDate() <= startTime">
                <div class="row row-cols-5 list-group list-group-item">
                  <button type="button" v-for="(x, index) in timeTable" :key="index" @click="
                    time = timeTable[index].split('-')[0].trim();
                    activeIndex = index;
                    activeClick(index);
                    d_tmp = new Date(x.split('-')[0].trim()).toISOString();
                  " :class="activeClick(index)" :disabled="
                    slot.includes(x.split('-')[0].trim()) ||
                    new Date(x.split('-')[0].trim()) < new Date()
                  " :activeIndex="index" class="'btn-sm'">
                    {{ new Date(x.split('-')[0]).toLocaleTimeString('it-IT').substring(0,5) }} -
                    {{ new Date(x.split('-')[1]).toLocaleTimeString('it-IT').substring(0,5) }}
                    <small v-if="slot.includes(x.split('-')[0].trim())">เวลานี้ถูกจองแล้ว</small>
                    <small v-if="new Date(x.split('-')[0].trim()) < new Date()">หมดเวลาจอง</small>
                  </button>
                </div>
              </div>
              <div class="col m-5">
                <textarea rows="4" class="form-control mt-3" placeholder="อยากบอกอะไรกับที่ปรึกษาไหม?" maxlength="300"
                  v-model="eNotes" />
              </div>
            </div>
          </div>
          <div class="col-md-6 d-md-flex align-items-md-center">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">เลือกวันที่ และเวลา</h2>
              <p class="my-3">
                เลือกวันและเวลาที่คุณสะสะดวก แล้วกดยืนยันได้เลย !
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight">
          <button class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem"
            @click="router.push(`/Eventinfo/${props.eventz.id}`)">
            ยกเลิก
          </button>
          <button class="btn btn-primary btn-sm mx-4" type="button" data-bs-toggle="modal" data-bs-target="#myModal"
            style="--bs-btn-border-radius: 1rem" :disabled="!(time != 0 && startTime != 0)">
            ยืนยัน
          </button>
        </div>
      </div>
    </section>

    <!-- modal -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
        <!-- con Modal edit HTML -->
        <div class="modal-content">
          <div class="modal-header flex-column">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#6E6E73" class="bi bi-check-lg"
                viewBox="0 0 16 16">
                <path
                  d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            </div>

            <h4 class="modal-title w-100">คุณต้องการแก้ไขของคุณ ?</h4>
          </div>
          <div class="modal-body">
            <p>
              หากคุณแก้ไขเวลาการนัดหมายของคุณแล้ว
              คุณจะสามารถเข้าถึงบริการได้ตามเวลาที่นัดหมาย
            </p>
          </div>
          <div class="modal-footer justify-content-center">
            <button data-bs-dismiss="modal" type="button" class="btn btn-primary rounded-pill" data-dismiss="modal"
              @click="
                editEvent();
                router.push(`/Eventinfo/${props.eventz.id}`);
              ">
              ยืนยัน
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-danger rounded-pill">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group {
  max-height: 300px;
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
