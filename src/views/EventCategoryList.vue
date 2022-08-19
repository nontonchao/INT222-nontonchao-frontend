<script setup>
import { onBeforeMount, ref } from "vue";
import { useEventCategory } from "../stores/eventCategory.js";

const EventCateStore = useEventCategory();
const cateList = ref([]);

onBeforeMount(async () => {
  await EventCateStore.getEventCategoryList();
  cateList.value = EventCateStore.eventCategoryList;
})
</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #f5f5f7;">
      <section class="border bottom-dark" style="background: #ffffff;">
        <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px;">
          <div class="container"><a class="navbar-brand d-flex align-items-center" href="#"><span
                class="fw-bold">คลินิกทั้งหมด</span></a>
            <div class="collapse navbar-collapse" id="navcol-2">
            </div>
          </div>
        </nav>
      </section>
    </section>
    <div class="container py-4 py-xl-5">
      <div class="row mb-5">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h2>คลินิกทั้งหมด</h2>
          <p class="w-lg-50">ที่พร้อมจะให้คำปรึกษากับคุณแบบเฉพาะด้าน<br></p>
        </div>
      </div>
      <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div class="col" v-for="(cate, index) in cateList" :key="index">
          <div class="card">
            <img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="../assets/testimg.png">
            <div class="card-body p-4">
              <p class="text-primary card-text mb-0">{{ cate.eventDuration }} นาที</p>
              <h4 class="card-title">{{ cate.eventCategoryName }}</h4>
              <p class="card-text">{{ cate.eventCategoryDescription }}</p>
              <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50"
                  src="../assets/testimg.png">
                <div>
                  <p class="fw-bold mb-0">อาจารย์ที่ปรึกษา</p>
                  <p class="text-muted mb-0">มานพ งบน้อย</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>