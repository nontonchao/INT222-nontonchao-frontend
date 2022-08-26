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
              <button type="button" class="btn-close px-5" data-bs-dismiss="modal" aria-label="Close"
                @click=""></button>
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
              <div class="d-flex flex-column justify-content-center align-items-start h-100">
                <div class="d-flex align-items-center p-3">
                  <img src="../assets/testimg.png" class="rounded img-fluid rounded-circle float-start w-100" />
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
          <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#myModal"
            style="--bs-btn-border-radius: 1rem">
            ยกเลิกนัดหมาย
          </button>
          <button class="btn btn-primary btn-sm mx-4" type="button" style="--bs-btn-border-radius: 1rem"
            @click="router.push(`/EditEvent/${thisEvent.id}`)">
            แก้ไข
          </button>
        </div>
      </div>
    </section>

    <!-- Modal HTML -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header flex-column">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>

            <h4 class="modal-title w-100">คุณต้องการจะยกเลิกนัดหมาย ?</h4>
          </div>
          <div class="modal-body">
            <p>
              หากคุณยกเลิกนัดหมายแล้วคุณจะไม่สามารถกู้คืนข้อมูลได้<br />
              คุณต้องการที่จะยกเลิกนัดหมายใช่หรือไม่
            </p>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary rounded-pill" data-bs-dismiss="modal" data-dismiss="modal"
              @click="removeEvent(); router.push(`/check-event`)">
              ยืนยัน

            </button>
            <button type="button" class="btn btn-danger rounded-pill" data-bs-dismiss="modal">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  border: 4px solid #f15e5e;
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

.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
