<script setup>
import { onBeforeMount, ref } from "vue";
import { useEvents } from "../stores/events.js";
import { useRoute, useRouter } from "vue-router";

const eventStore = useEvents();
const route = useRoute();
const router = useRouter();
const thisEvent = ref({});

onBeforeMount(async () => {
  thisEvent.value = {
    eventCategory: {
      eventCategoryName: "",
    },
  };
  thisEvent.value = await eventStore.getEventById(route.params.event_id);
});

const removeEvent = async () => {
  await eventStore.removeEvent(thisEvent.value.id);
};
</script>
<template>
  <div>
    <section class="position-relative py-4 py-xl-5" style="background: #f5f5f7">
      <!-- modal noti -->
      <section class="border bottom-dark" style="background: #0071e3">
        <nav class="navbar navbar-light" style="margin: 2px">
          <div class="px-5 container align-items-center">
            <h6 class="fw-bold px-5 mt-2" style="color: #ffffff">
              แก้ไขการนัดหมายของคุณเรียบร้อยแล้ว
            </h6>
            <ul class="navbar-nav ms-auto">
              <button
                type="button"
                class="btn-close px-5"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click=""
              ></button>
            </ul>
          </div>
        </nav>
      </section>
      <!-- modal noti -->

      <div class="container">
        <h1 class="fw-bold mb-4 display-10" style="margin: 100px">
          ข้อมูลนัดหมาย
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
                  <p class="px-4 text-muted mb-5">
                    {{ thisEvent.bookingName }}
                  </p>
                  <p class="px-4 fw-bold text-primary mb-0">อีเมล</p>
                  <p class="px-4 text-muted mb-0">
                    {{ thisEvent.bookingEmail }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 col-xl-4 m-5 p-5">
              <div>
                <p class="px-4 fw-bold text-primary mb-0">คลินิก</p>
                <p class="px-4 text-muted mb-5">
                  {{ thisEvent.eventCategory.eventCategoryName }}
                </p>
                <p class="px-4 fw-bold text-primary mb-0">วันที่</p>
                <p class="px-4 text-muted mb-5">
                  {{
                    new Date(thisEvent.eventStartTime).toLocaleDateString() +
                    " " +
                    new Date(thisEvent.eventStartTime).toLocaleTimeString()
                  }}
                </p>
                <p class="px-4 fw-bold text-primary mb-0">รายละเอียด</p>
                <p class="px-4 text-muted mb-0">
                  {{ thisEvent.eventNotes }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight">
          <button
            class="btn btn-danger btn-sm"
            type="button"
            style="--bs-btn-border-radius: 1rem"
            @click="removeEvent()"
          >
            ยกเลิกนัดหมาย
          </button>
          <button
            class="btn btn-primary btn-sm mx-4"
            type="button"
            style="--bs-btn-border-radius: 1rem"
            @click="router.push(`/EditEvent/${thisEvent.id}`)"
          >
            แก้ไข
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
