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

generateTimeSlot(toEdit.eventDuration);

const editEvent = async () => {
  toEdit = {
    eventStartTime:
      new Date(startTime.value)
        .toISOString()
        .replace(".000Z", "Z")
        .split("T")[0] +
      "T" +
      time.value +
      ":00Z",
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
            style="margin: 60px"
          >
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
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                disabled
                checked
              />
              {{ eventz.eventCategory.eventCategoryName }}
              <label class="form-check-label">
                <small class="text-muted"
                  >({{ eventz.eventCategory.eventDuration }} นาที)</small
                >
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-3 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
          ></div>
          <div class="col-md-6 form-floating">
            <form class="mt-1">
              <div class="row">
                <div class="col">
                  <p>
                    <strong>Firstname: </strong
                    >{{ eventz.bookingName.split(" ")[0] }}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <strong>Lastname: </strong
                    >{{ eventz.bookingName.split(" ")[1] }}
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
              <input type="date" class="form-control" v-model="startTime" />
            </div>
            <div>
              <div class="container text-center" v-show="startTime.length > 0">
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
              <div class="col m-5">
                <textarea
                  rows="4"
                  class="form-control mt-3"
                  placeholder="อยากบอกอะไรกับที่ปรึกษาไหม?"
                  maxlength="300"
                  v-model="eNotes"
                />
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
          <button
            class="btn btn-danger btn-sm"
            type="button"
            style="--bs-btn-border-radius: 1rem"
            @click="router.push(`/Eventinfo/${props.eventz.id}`)"
          >
            ยกเลิก
          </button>
          <button
            class="btn btn-primary btn-sm mx-4"
            type="button"
            style="--bs-btn-border-radius: 1rem"
            @click="editEvent()"
          >
            ยืนยัน
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
