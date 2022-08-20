<script setup></script>

<template>
  <div>
    <section class="py-4 py-xl-5">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav
          class="navbar navbar-light navbar-expand-md py-3"
          style="margin: 2px"
        >
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"
              ><span class="fw-bold">OASIP ID</span></a
            >
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item px-4">
                  <router-link
                    class="nav-link"
                    :to="{
                      name: 'Login',
                    }"
                  >
                    ลงชื่อเข้าใช้
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    :to="{
                      name: 'AddUser',
                    }"
                  >
                    สร้าง OASIP ID ของคุณ
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <section class="container py-4 py-xl-5">
        <div class="row mb-5 p-4 p-lg-5">
          <div class="col-md-8 col-xl-6 text-center mx-auto pt-3">
            <h2 class="fw-bold">บัญชีเดียวสำหรับทุกสิ่งที่เป็น OASIP</h2>
            <p class="w-lg-50">
              เข้าถึงบริการ OASIP-SY1 by NTC ได้ทั้งหมดด้วย OASIP ID
              และรหัสผ่านเดียว ลงชื่อเข้าเพื่อจัดการบัญชีของคุณ<br />
            </p>
          </div>
          <div class="position-relative py-4 py-xl-5">
            <div class="container position-relative">
              <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-5">
                  <div class="card mb-5 border-0">
                    <div class="card-body p-sm-5">
                    
                      <div class="mb-3">
                        <input
                          v-model="email_"
                          class="form-control"
                          type="email"
                          id="email-2"
                          name="email"
                          placeholder="อีเมล"
                        />
                      </div>
                      <div class="mb-5">
                        <input
                          v-model="email_"
                          class="form-control"
                          type="text"
                          id="password"
                          name="password"
                          placeholder="รหัสผ่าน"
                        />
                      </div>
                      <div class="text-center">
                        <button
                          @click="register()"
                          class="btn btn-danger btn-sm mx-4"
                          type="button"
                          style="--bs-btn-border-radius: 1rem"
                        >
                          ลงชื่อเข้าใช้
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <router-link
                     
                      :to="{
                        name: 'AddUser',
                      }"
                    >
                      ไม่มี OASIP ID ใช่ไหม? สร้างของคุณเองตอนนี้ >
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped></style>
