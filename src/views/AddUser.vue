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
    name: firstname.value.trim() + " " + lastname.value.trim(),
    email: email_.value.trim(),
    role: role_.value == "นักศึกษา" ? "student" : "lecturer",
  });
};

const emailStatus = ref(2);
const validateEmail = (email) => {
  if (
    email.length != 0 &&
    email.length < 100 &&
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
      email
    )
  ) {
    emailStatus.value = 1
    return true;
  } else {
    emailStatus.value = 0
    return false;
  }
  emailStatus.value = 0
  return false;
};

const clearForm = () => {
  firstname.value = "";
  lastname.value = "";
  email_.value = "";
  role_.value = "นักศึกษา";
  emailStatus.value = 2
}

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

        <!-- modal noti -->
        <section class="border bottom-dark" style="background: #0071e3">
          <nav class="navbar navbar-light" style="margin: 2px">
            <div class="px-5 container align-items-center">
              <h6 class="fw-bold px-5" style="color: #ffffff">
                สร้าง OASIP ID ของคุณเรียบร้อยแล้ว
              </h6>
              <ul class="navbar-nav ms-auto">
                <button
                  type="button"
                  class="btn-close px-5"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </ul>
            </div>
          </nav>
        </section>
        <!-- modal noti -->
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
                              required
                              type="text"
                              id="fname"
                              name="name"
                              minlength="1"
                              maxlength="50"
                              placeholder="ชื่อ"
                            />
                          </div>
                          <div class="col-md-6">
                            <input
                              v-model="lastname"
                              class="form-control"
                              required
                              type="text"
                              id="lname"
                              name="lastname"
                              minlength="1"
                              maxlength="50"
                              placeholder="นามสกุล"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <input
                          v-model="email_"
                          class="form-control"
                          required
                          type="email"
                          id="email-2"
                          name="email"
                          minlength="1"
                          maxlength="50"
                          placeholder="อีเมล"
                          @change="validateEmail(email_)"
                        />
                        <small class="text-danger" v-if="emailStatus==0">*โปรดใส่ Email ที่ถูกต้อง</small>
                      </div>

                      <hr />
                      <div class="mt-5 mb-3">
                        <input
                          class="form-control "
                          type="text"
                          id="password"
                          name="password"
                          placeholder="รหัสผ่าน"
                        />
                      </div>
                      <div class="mb-5">
                        <input
                          class="form-control "
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
                          :disabled="!(firstname!=0&&lastname!=0&&email_!=0&&validateEmail(email_))"
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
