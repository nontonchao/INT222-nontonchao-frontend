<script setup>
import { onBeforeMount, ref } from "vue";
import { useEvents } from "../stores/events.js";
import { useRoute, useRouter } from "vue-router";
import { useLogin } from "../stores/login.js";

const loginStore = useLogin();
const eventStore = useEvents();
const route = useRoute();
const router = useRouter();
const thisEvent = ref({});
const canEdit = ref(false);
const emailInfo = ref();

const endtime = (startTime, add) => {
  return new Date(
    new Date(startTime).setMinutes(new Date(startTime).getMinutes(), add * 60)
  );
};

const isPastOrOngoing = (thisEvent) => {
  const currentDateTime = new Date();
  if (
    endtime(thisEvent.eventStartTime, thisEvent.eventDuration) <
      currentDateTime ||
    (new Date(thisEvent.eventStartTime).getDate() ==
      currentDateTime.getDate() &&
      currentDateTime.getTime() >
        new Date(thisEvent.eventStartTime).getTime() &&
      currentDateTime <
        endtime(thisEvent.eventStartTime, thisEvent.eventDuration)) ||
    loginStore.roles == "ROLE_LECTURER"
  ) {
    canEdit.value = true;
  } else {
    canEdit.value = false;
  }
};

const downloadFile = async () => {
  fetch(
    `${import.meta.env.VITE_BASE_URL}file/get/` + thisEvent.value.attachment,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    }
  )
    .then((r) => r.blob())
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = thisEvent.value.attachment.split(",")[1];
      a.click();
    });
};

const deleteFile = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}file/` + thisEvent.value.attachment,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    }
  );
  if ((await res.status) == 200) {
    alert("Attachment deleted!");
  } else {
    alert("Error while deleting");
  }
};

onBeforeMount(async () => {
  topFunc();
  eventStore.statusCode = 0;
  thisEvent.value = {
    eventCategory: {
      eventCategoryName: "",
    },
  };
  thisEvent.value = await eventStore.getEventById(route.params.event_id);
  emailInfo.value = "mailto:" + thisEvent.value.bookingEmail;
  isPastOrOngoing(thisEvent.value);

});
const removeEvent = async () => {
  await eventStore.removeEvent(thisEvent.value.id);
};
function topFunc() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
</script>

<template>
  <div>
    <section class="position-relative py-4 py-xl-5" style="background: #f5f5f7">
      <!-- modal noti -->
      <div v-if="eventStore.statusCode == 200">
        <section class="border bottom-dark" style="background: #0071e3">
          <nav class="navbar navbar-light" style="margin: 2px">
            <div class="px-5 container align-items-center">
              <h6 class="fw-bold px-5 mt-2" style="color: #ffffff">
                แก้ไขการนัดหมายของคุณเรียบร้อยแล้ว
              </h6>
              <ul class="navbar-nav ms-auto">
                <button type="button" class="btn-close px-5" data-bs-dismiss="modal" aria-label="Close"
                  @click="eventStore.statusCode = 0"></button>
              </ul>
            </div>
          </nav>
        </section>
      </div>
      <!-- modal noti -->

      <div class="container">
        <h1 class="fw-bold mb-4 display-10" style="margin: 100px">
          <div>
            <svg @click="router.push(`/check-event/`)" xmlns="http://www.w3.org/2000/svg" width="60" height="60"
              fill="#0d6efd" class="bi bi-arrow-left-short" viewBox="0 0 12 17" style="cursor: pointer">
              <path fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
            </svg>
            ข้อมูลนัดหมาย
          </div>
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
                  
                  <div>
                    <p class="px-4 text-muted mb-0">
                      {{ thisEvent.bookingEmail }}
                      <a :href="emailInfo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-envelope-at"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
                          />
                          <path
                            d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                          /></svg
                      ></a>
                    </p>
                  </div>
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
                <p class="px-4 fw-bold text-primary mb-0 mt-5">
                  เอกสารที่แนบมา
                </p>
                <div v-if="thisEvent.attachment != null">
                  <div class="d-flex justify-content-start">
                    <p class="px-4 text-muted mb-5">
                      {{ thisEvent.attachment.split(",")[1] }}
                    </p>
                    <div>
                      <button class="btn btn-primary btn-sm mx-4" type="button" style="--bs-btn-border-radius: 1rem"
                        @click="downloadFile()">
                        ดาวน์โหลด
                      </button>
               
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex justify-content-start">
                    <p class="px-4 text-muted mb-5">ไม่ได้แนบเอกสารมา</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse bd-highlight">
          <div v-show="loginStore.isAdmin && canEdit">
            <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#myModal"
              style="--bs-btn-border-radius: 1rem">
              ลบนัดหมาย
            </button>
          </div>
          <div v-show="!canEdit">
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
              @click="
  removeEvent();
router.push(`/check-event`);
              ">
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
