<script setup>
import { ref } from "vue";
import { useLogin } from "../stores/login.js";

const loginStore = useLogin();

const email = ref("");
const password = ref("");

const login = async () => {
  await loginStore.login(email.value, password.value);
};
</script>

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
                          v-model="email"
                          class="form-control"
                          type="email"
                          id="email-2"
                          name="email"
                          placeholder="อีเมล"
                        />
                      </div>
                      <div class="mb-5">
                        <input
                          v-model="password"
                          class="form-control"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="รหัสผ่าน"
                        />
                      </div>
                      <div class="text-center">
                        <button
                          @click="login()"
                          class="btn btn-danger btn-sm mx-4"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
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

    <!-- Modal HTML -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header flex-column">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-hidden="true"
            ></button>
            <div class="icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                class="bi bi-egg-fried"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path
                  d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"
                />
              </svg>
            </div>

            <h4 class="modal-title w-100">สวัสดี....</h4>
          </div>
          <div class="modal-body">
            <p>OASIP by NTC ยินดีให้บริการ<br /></p>
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
