<script setup></script>

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
        <div class="row gy-4 gy-md-0">
          <div class="col-md-6 p-5">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
              />
              <label class="form-check-label">
                {{}}
                <small class="text-muted">{{}} นาที)</small>
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
      <div class="container py-4 py-xl-5" >
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
                    maxlength="50"
                    v-model="firstname"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
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
                    class="form-control mt-3"
                    placeholder="อีเมล"
                    maxlength="50"
                    v-model="email"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="container py-4 py-xl-5" style="background: #f5f5f7">
        <div class="row gy-4 gy-md-0">
          <div class="col-md-6">
            <div class="m-5">
              <input type="datetime-local" class="form-control" />
            </div>
            <div>
              <div class="container text-center">
                <div class="row row-cols-6">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm m-2"
                  >
                    00:00-00:15
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm m-2"
                  >
                    Column
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm m-2"
                  >
                    Column
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm m-2"
                  >
                    Column
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm m-2"
                  >
                    Column
                  </button>
                </div>
              </div>
            </div>
            <div class="p-xl-5 m-xl-5"></div>
          </div>
          <div class="col-md-6 d-md-flex align-items-md-center">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 3</h2>
              <p class="my-3">สะดวกเข้าคลินิกวันไหนล่ะ :D</p>
            </div>
          </div>
        </div>
        <button class="btn btn-danger" type="button">ยืนยันการจอง</button>
      </div>
    </section>
  </div>
  >
</template>

<style scoped></style>
