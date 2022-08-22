<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useEvents } from "../stores/events.js";
import { useEventCategory } from "../stores/eventCategory.js";

const eventCateStore = useEventCategory();
const eventStore = useEvents();
const eventList = ref({});
const eventCateList = ref([]);
const router = useRouter();

onBeforeMount(async () => {
  eventList.value = await eventStore.fetchEvents();
  //filter_list.value = eventList.value;
  eventCateList.value = eventCateStore.eventCategoryList;
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
              ><span class="fw-bold">นัดหมายทั้งหมด</span></a
            >
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto" v-show="eventList.length > 0">
                <li class="nav-item">
                  <a class="nav-link active" href="#">กำลังจะมาถึง</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">กำลังดำเนินอยู่</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">ที่ผ่านมา</a>
                </li>
                <li class="nav-item">
                  <select class="form-select form-select-sm mt-1">
                    <option selected>ทั้งหมด</option>
                    <option
                      v-for="(eCatelist, index) in eventCateList"
                      :key="index"
                    >
                      {{ eCatelist.eventCategoryName }}
                    </option>
                  </select>
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
            <button
              class="btn btn-danger fs-5 me-2 py-2 px-4"
              type="button"
              style="
                margin: -57px 0px;
                --bs-primary-rgb: 220, 53, 69;
                padding: 0px 24px;
              "
            >
              <router-link
                :to="{ name: 'AddEvent' }"
                style="text-decoration: none; color: #ffffff"
                >จองนัดหมายเลย
              </router-link>
            </button>
          </div>
        </div>
        <div v-else>
          <div
            class="text-center text-white-50 bg-danger border rounded border-0 p-3 my-5"
          >
            <div class="row row-cols-2 row-cols-md-4">
              <div class="col">
                <div class="p-3">
                  <h4 class="display-5 fw-bold text-white mb-0">
                    {{ eventList.length }}
                  </h4>
                  <p class="mb-0 text-white">นัดหมายทั้งหมด</p>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <h4 class="display-5 fw-bold text-white mb-0">
                    {{ eventList.length }}
                  </h4>
                  <p class="mb-0 text-white">กำลังจะมาถึง</p>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <h4 class="display-5 fw-bold text-white mb-0">
                    {{ eventList.length }}
                  </h4>
                  <p class="mb-0 text-white">กำลังดำเนินอยู่</p>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <h4 class="display-5 fw-bold text-white mb-0">
                    {{ eventList.length }}
                  </h4>
                  <p class="mb-0 text-white">ที่ผ่านมา</p>
                </div>
              </div>
            </div>
          </div>
          <!-- eventList -->

          <div class="border rounded border-1 p-3">
            <div class="panel panel-primary">
              <div class="panel-body my-5 text-center">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item hover"
                    v-for="(event, index) in eventList"
                    :key="index"
                    @click="router.push(`/Eventinfo/${event.id}`)"
                  >
                    <div class="row row-cols-2 row-cols-md-3">
                      <div class="col">
                        <div class="my-4">
                          <img
                            src="../assets/testimg.png"
                            class="rounded img-fluid rounded-circle float-start w-25"
                          />
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
                          <strong
                            ><kbd>{{ event.id }}</kbd>
                            {{ event.eventCategoryName }}</strong
                          >
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
