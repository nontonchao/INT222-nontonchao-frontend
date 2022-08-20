<script setup>
import { ref } from "vue";
import { useUsers } from "../stores/users.js";

const userStore = useUsers();

const firstname = ref("");
const lastname = ref("");
const email_ = ref("");
const role_ = ref("นักศึกษา");

const register = async () => {
  await userStore.userRegister({
    name: firstname.value + " " + lastname.value,
    email: email_.value,
    role: role_.value == "นักศึกษา" ? "student" : "lecturer",
  });
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
            <h2 class="fw-bold">สร้าง OASIP ID ของคุณ</h2>
            <p class="w-lg-50">
              OASIP ID
              คือบัญชีเดียวเท่านั้นที่คุณต้องการสำหรับการใช้บริการทุกอย่างจาก
              OASIP<br />
            </p>
          </div>
          <div class="position-relative py-4 py-xl-5">
            <div class="container position-relative">
              <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-7">
                  <div class="card mb-5 border-0">
                    <div class="card-body p-sm-5">
                      <p>คุณเป็นใคร ?</p>
                      <div class="mb-4">
                        <select
                          v-model="role_"
                          class="form-select form-select mt-1"
                        >
                          <option selected>นักศึกษา</option>
                          <option>อาจารย์</option>
                        </select>
                      </div>
                      <div>
                        <div class="row mb-3">
                          <div class="col-md-6">
                            <input
                              v-model="firstname"
                              class="form-control"
                              type="text"
                              id="fname"
                              name="name"
                              placeholder="ชื่อ"
                            />
                          </div>
                          <div class="col-md-6">
                            <input
                              v-model="lastname"
                              class="form-control"
                              type="text"
                              id="lname"
                              name="lastname"
                              placeholder="นามสกุล"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <input
                          v-model="email_"
                          class="form-control"
                          type="email"
                          id="email-2"
                          name="email"
                          placeholder="อีเมล"
                        />
                      </div>

                      <hr />
                      <div class="mt-5 mb-3">
                        <input
                          class="form-control"
                          type="text"
                          id="password"
                          name="password"
                          placeholder="รหัสผ่าน"
                        />
                      </div>
                      <div class="mb-5">
                        <input
                          class="form-control"
                          type="text"
                          id="Cpassword"
                          name="Cpassword"
                          placeholder="ยืนยันรหัสผ่าน"
                        />
                      </div>
                      <div class="text-center">
                        <button
                          @click="register()"
                          class="btn btn-danger btn-sm mx-4"
                          type="button"
                          style="--bs-btn-border-radius: 1rem"
                        >
                          สร้าง ID
                        </button>
                      </div>
                    </div>
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
