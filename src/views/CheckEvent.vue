<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useEvents } from "../stores/events.js";
import { useEventCategory } from "../stores/eventCategory.js";

const eventCateStore = useEventCategory();
const eventStore = useEvents();
const eventList = ref({});
const eventCateList = ref([]);
const router = useRouter();

//event num
const eAll = ref(0);
const eComing = ref(0);
const eOngoing = ref(0);
const ePast = ref(0);
//

// filter
const filter_list = ref({});
const fStatus = ref("ทั้งหมด");
const status = ref("ทั้งหมด");
const selectedClinic = ref("ทั้งหมด");
const selectDate = ref("");
const search = ref("");

const endtime = (startTime, add) => {
  return new Date(
    new Date(startTime).setMinutes(new Date(startTime).getMinutes(), add * 60)
  );
};

const eventNum = () => {
  eAll.value = 0;
  eComing.value = 0;
  eOngoing.value = 0;
  ePast.value = 0;
  const currentDateTime = new Date();
  eAll.value = eventList.value.length;
  eventList.value.filter((x) => {
    if (new Date(x.eventStartTime) > currentDateTime) {
      eComing.value++;
    }
  });
  eventList.value.filter((x) => {
    if (
      new Date(x.eventStartTime).getDate() == currentDateTime.getDate() &&
      currentDateTime.getTime() > new Date(x.eventStartTime).getTime() &&
      currentDateTime < endtime(x.eventStartTime, x.eventDuration)
    ) {
      eOngoing.value++;
    }
  });
  eventList.value.filter((x) => {
    if (endtime(x.eventStartTime, x.eventDuration) < currentDateTime) {
      ePast.value++;
    }
  });
};

const filterEvent = async (search) => {
  eventList.value = await eventStore.fetchEvents();
  const currentDateTime = new Date();
  if (status.value != "ทั้งหมด") {
    selectDate.value = "";
  }
  filter_list.value = eventList.value.filter(
    (x) =>
      (x.bookingName.includes(search) || x.bookingEmail == search) &&
      x.eventCategoryName.includes(
        selectedClinic.value == "ทั้งหมด" ? "" : selectedClinic.value
      ) &&
      (status.value == "ทั้งหมด" && selectDate.value == ""
        ? x
        : status.value == "ทั้งหมด" && selectDate.value != ""
          ? new Date(x.eventStartTime).toDateString() ==
          new Date(selectDate.value).toDateString()
          : status.value == "กำลังจะมาถึง"
            ? new Date(x.eventStartTime) > currentDateTime
            : status.value == "กำลังดำเนินอยู่"
              ? new Date(x.eventStartTime).getDate() == currentDateTime.getDate() &&
              currentDateTime.getTime() > new Date(x.eventStartTime).getTime() &&
              currentDateTime < endtime(x.eventStartTime, x.eventDuration)
              : endtime(x.eventStartTime, x.eventDuration) < currentDateTime)
  );
  fStatus.value = status.value;
};
//

onBeforeMount(async () => {
  eventList.value = await eventStore.fetchEvents();
  filter_list.value = eventList.value;
  eventCateList.value = eventCateStore.eventCategoryList;
  eventNum();
});

onMounted(async () => {
  eventList.value = await eventStore.fetchEvents();
  filter_list.value = eventList.value;
  eventNum();
});
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #f5f5f7">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"><span class="fw-bold">นัดหมายทั้งหมด</span></a>
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto" v-show="eventList.length > 0">
                <li class="nav-item mx-2">
                  <input type="text" class="form-control form-control-sm" placeholder="ชื่อ, อีเมล" v-model="search" />
                </li>
                <li class="nav-item mx-2">
                  <input type="date" class="form-control form-control-sm" v-model="selectDate" />
                </li>
                <li class="nav-item mx-2">
                  <select v-model="selectedClinic" class="form-select form-select-sm">
                    <option selected>ทั้งหมด</option>
                    <option v-for="(eCatelist, index) in eventCateList" :key="index">
                      {{ eCatelist.eventCategoryName }}
                    </option>
                  </select>
                </li>
                <li class="nav-item mx-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-search" viewBox="0 0 16 16" @click="filterEvent(search)" style="cursor: pointer">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <div class="container">
        <div v-if="eventList.length <= 0">
          <div class="text-center p-4 p-lg-5">
            <h1 class="fw-bold mb-4 display-5" style="margin: 125px">
              No Scheduled Events
            </h1>
            <figure style="margin: 0px; padding: 45px">
              <blockquote class="blockquote">
                <p class="mb-0 display-6">ยังไม่มีนัดหมายเลย ลองจองมั้ยล่ะ?</p>
              </blockquote>
              <figcaption class="text-muted" style="font-size: 20px">
                จองนัดหมายแล้วไปกันเลย!
              </figcaption>
            </figure>
            <button class="btn btn-danger fs-5 me-2 py-2 px-4" type="button" style="
                margin: -57px 0px;
                --bs-primary-rgb: 220, 53, 69;
                padding: 0px 24px;
              ">
              <router-link :to="{ name: 'AddEvent' }" style="text-decoration: none; color: #ffffff">จองนัดหมายเลย
              </router-link>
            </button>
          </div>
        </div>
        <div v-else>
          <div class="text-center text-white-50 bg-danger border rounded border-0 p-3 my-5">
            <div class="row row-cols-2 row-cols-md-4">
              <div @click="
                status = 'ทั้งหมด';
                filterEvent(search);
              " style="cursor: pointer">
                <div class="col">
                  <div class="p-3">
                    <h4 class="display-5 fw-bold text-white mb-0">
                      {{ eAll }}
                    </h4>
                    <p class="mb-0 text-white">นัดหมายทั้งหมด</p>
                  </div>
                </div>
              </div>
              <div @click="
                status = 'กำลังจะมาถึง';
                filterEvent(search);
              " style="cursor: pointer">
                <div class="col">
                  <div class="p-3">
                    <h4 class="display-5 fw-bold text-white mb-0">
                      {{ eComing }}
                    </h4>
                    <p class="mb-0 text-white">กำลังจะมาถึง</p>
                  </div>
                </div>
              </div>
              <div @click="
                status = 'กำลังดำเนินอยู่';
                filterEvent(search);
              " style="cursor: pointer">
                <div class="col">
                  <div class="p-3">
                    <h4 class="display-5 fw-bold text-white mb-0">
                      {{ eOngoing }}
                    </h4>
                    <p class="mb-0 text-white">กำลังดำเนินอยู่</p>
                  </div>
                </div>
              </div>
              <div @click="
                status = 'ที่ผ่านมา';
                filterEvent(search);
              " style="cursor: pointer">
                <div class="col">
                  <div class="p-3">
                    <h4 class="display-5 fw-bold text-white mb-0">
                      {{ ePast }}
                    </h4>
                    <p class="mb-0 text-white">ที่ผ่านมา</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- eventList -->
          <div class="border rounded border-1 p-3">
            <div v-if="filter_list.length <= 0">
              <h1 v-if="fStatus == 'ที่ผ่านมา'">No Past Events</h1>
              <h1 v-else-if="fStatus == 'กำลังจะมาถึง'">No Upcoming Events</h1>
              <h1 v-else-if="fStatus == 'กำลังดำเนินอยู่'">
                No Ongoing Events
              </h1>
              <h1 v-else>No Scheduled Events</h1>
            </div>
            <div class="panel panel-primary">
              <div class="panel-body my-5 text-center">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item hover" v-for="(event, index) in filter_list" :key="index"
                    @click="router.push(`/Eventinfo/${event.id}`)">
                    <div class="row row-cols-2 row-cols-md-3">
                      <div class="col">
                        <div class="my-4">
                          <img src="../assets/testimg.png" class="rounded img-fluid rounded-circle float-start w-25" />
                          <strong>{{ event.bookingName }}</strong>
                          <p class="text-muted">ตำแหน่ง</p>
                        </div>
                      </div>
                      <div class="col">
                        <div class="my-4">
                          <p class="vrtext-muted card-subtitle mb-2 text-muted">
                            {{ new Date(event.eventStartTime).toDateString() }}
                          </p>
                          <strong></strong>
                          <p class="text-muted my">
                            เวลา
                            {{
                            new Date(
                            event.eventStartTime
                            ).toLocaleTimeString()
                            }}
                          </p>
                        </div>
                      </div>
                      <div class="col">
                        <div class="my-4">
                          <strong><kbd>{{ event.id }}</kbd>
                            {{ event.eventCategoryName }}</strong>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- eventList -->
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.list-group {
  max-height: 600px;
  margin-bottom: 10px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}

.scale:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 0.15rem rgb(129, 128, 128));
}

.hover:hover {
  background-color: darkgray;
  cursor: pointer;
}
</style>
