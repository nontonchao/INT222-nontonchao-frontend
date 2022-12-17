<script setup>
import { ref } from "vue";
import { useUsers } from "../stores/users.js";
import { useRouter } from "vue-router";
const userStore = useUsers();
const router = useRouter();
const firstname = ref("");
const lastname = ref("");
const email_ = ref("");
const role_ = ref("นักศึกษา");
const passwordX = ref("");
const ConfirmPassword = ref("");
const emailCheck = async () => {
  await userStore.emailCheck(email_.value);
};
const register = async () => {
  await userStore.userRegister({
    name: firstname.value.trim() + " " + lastname.value.trim(),
    email: email_.value.trim(),
    role: role_.value == "นักศึกษา" ? "student" : "lecturer",
    password: passwordX.value,
  });
  console.log(await `status ${userStore.resStatus}`);
};
const emailStatus = ref();
const validateEmail = (email) => {
  if (
    email.length != 0 &&
    email.length < 100 &&
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
      email
    )
  ) {
    emailStatus.value = 1;
    return true;
  } else {
    emailStatus.value = 0;
    return false;
  }
};
const clearForm = () => {
  firstname.value = "";
  lastname.value = "";
  email_.value = "";
  role_.value = "นักศึกษา";
  emailStatus.value = 3;
};
const validatePass = () => {
  if (
    passwordX.value.length != 0 &&
    ConfirmPassword.value.length != 0 &&
    passwordX.value.length >= 8 &&
    passwordX.value.length <= 14 &&
    ConfirmPassword.value.length >= 8 &&
    ConfirmPassword.value.length <= 14 &&
    passwordX.value.length == ConfirmPassword.value.length &&
    passwordX.value == ConfirmPassword.value
  ) {
    return true;
  }
  return false;
};
</script>

<template>
  <div>
    <section class="py-4 py-xl-5">
      <section class="border bottom-dark" style="background: #ffffff">
        <nav class="navbar navbar-light navbar-expand-md py-3" style="margin: 2px">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#"><span class="fw-bold">OASIP ID</span></a>
            <div class="collapse navbar-collapse" id="navcol-2">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item px-4">
                  <router-link class="nav-link" :to="{
                    name: 'Login',
                  }">
                    ลงชื่อเข้าใช้
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{
                    name: 'AddUser',
                  }">
                    สร้าง OASIP 
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <section class="container py-4 py-xl-5">
        <div class="row mb-5 p-4 p-lg-5">
          <div>
            <div class="col-md-8 col-xl-6 text-center mx-auto pt-3">
              <h2 class="fw-bold">สร้าง OASIP </h2>
              <p class="w-lg-50">
                OASIP ID
                คือบัญชีเดียวเท่านั้นที่คุณต้องการสำหรับการใช้บริการทุกอย่างจาก
                OASIP<br />
              </p>
            </div>
          </div>
          <div class="col-md-8 col-xl-6 mx-auto pt-3">
            <p class="text-left">
              คุณสามารถสร้าง OASIP ID ของคุณตามขั้นตอนดังนี้<br />
              1.ใส่ข้อมูลส่วนตัวของคุณ<br />
              2.ทำการตรวจสอบอีเมล<br />
              3.ตั้งรหัสผ่านเพื่อความปลอดภัยของคุณ<br />
              4.ยินดีด้วยการสร้าง OASIP ID ของคุณสำเร็จแล้ว!
            </p>
          </div>
          <div class="position-relative py-4 py-xl-1">
            <div class="container position-relative">
              <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-7">
                  <div class="card mb-5 border-0">
                    <div class="card-body p-sm-5">
                      <p>คุณเป็นใคร ?</p>
                      <div class="mb-4">
                        <select v-model="role_" class="form-select form-select mt-1">
                          <option selected>นักศึกษา</option>
                          <option>อาจารย์</option>
                        </select>
                      </div>
                      <div>
                        <div class="row mb-3">
                          <div class="col-md-6">
                            <input v-model="firstname" class="form-control" required type="text" id="fname" name="name"
                              minlength="1" maxlength="50" placeholder="ชื่อ" />
                          </div>
                          <div class="col-md-6">
                            <input v-model="lastname" class="form-control" required type="text" id="lname"
                              name="lastname" minlength="1" maxlength="50" placeholder="นามสกุล" />
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-11">
                          <input v-model="email_" class="form-control" required type="email" id="email-2" name="email"
                            minlength="1" maxlength="50" placeholder="อีเมล" @change="validateEmail(email_)"
                            @keyup="userStore.isEmailNotUnique(email_)" :disabled="
                              userStore.resStatus == 200 &&
                              email_ != 0 &&
                              validateEmail(email_)
                            " />
                        </div>
                        <div class="col">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-check2-circle color:" viewBox="0 0 16 16" style="cursor: pointer"
                            @click="emailCheck()" data-bs-toggle="modal" data-bs-target="#myModal400">
                            <path
                              d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path
                              d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                          </svg>
                        </div>

                        <p class="text-danger text-end fs-6" v-if="emailStatus == 0">
                          *กรุณาใส่อีเมลให้ถูกต้อง
                        </p>
                        <p class="text-danger text-end fs-6" v-if="userStore.resStatus == 400">
                          *อีเมลนี้ถูกใช้ไปแล้ว
                        </p>
                      </div>

                      <hr />
                      <div v-show="
                        firstname != 0 &&
                        lastname != 0 &&
                        userStore.resStatus == 200 &&
                        email_ != 0 &&
                        validateEmail(email_)
                      ">
                        <div class="mt-5 mb-3">
                          <input class="form-control" v-model="passwordX" type="password" id="password" name="password"
                            minlength="8" maxlength="14" required placeholder="รหัสผ่านต้องมีความยาว 8-14 ตัวอักษร"
                            @change="validatePass()" />
                        </div>

                        <div class="mb-5">
                          <input class="form-control" v-model="ConfirmPassword" type="password" id="Cpassword"
                            name="Cpassword" minlength="8" maxlength="14" required placeholder="ยืนยันรหัสผ่าน"
                            @change="validatePass()" />
                          <p v-show="
                            !passwordX == 0 &&
                            !ConfirmPassword == 0 &&
                            !validatePass()
                          " class="text-danger text-end fs-6">
                            *รหัสผ่านไม่ถูกต้อง
                          </p>
                        </div>

                        <div class="text-center">
                          <button class="btn btn-danger btn-sm mx-4" type="button" data-bs-toggle="modal"
                            data-bs-target="#myModal" style="--bs-btn-border-radius: 1rem" :disabled="
                              !(
                                firstname != 0 &&
                                lastname != 0 &&
                                email_ != 0 &&
                                validateEmail(email_) &&
                                validatePass() &&
                                !userStore.isEmailNotUnique(email_)
                              )
                            ">
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
        </div>
      </section>
    </section>
  </div>

  <!-- modal -->
  <div id="myModal" class="modal fade">
    <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
      <!-- con Modal edit HTML -->
      <div class="modal-content">
        <div class="modal-header flex-column">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#6E6E73" class="bi bi-check-lg"
              viewBox="0 0 16 16">
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
          </div>

          <h4 class="modal-title w-100">คุณต้องการสร้าง OASIP ID ของคุณ ?</h4>
        </div>
        <div class="modal-body">
          <p>
            คุณจะสามารถเข้าถึงบริการ OASIP-SY1 by NTC ได้ทั้งหมดด้วย OASIP ID
            และรหัสผ่านเดียว ลงชื่อเข้าเพื่อจัดการบัญชีของคุณ
          </p>
        </div>
        <div class="modal-footer justify-content-center">
          <button data-bs-dismiss="modal" type="button" class="btn btn-primary rounded-pill" data-dismiss="modal"
            data-bs-toggle="modal" data-bs-target="#myModal" @change="validatePass()" @click="
              register();
              router.push('/Login');
            ">
            ยืนยัน
          </button>
          <button type="button" data-bs-dismiss="modal" class="btn btn-danger rounded-pill">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="myModal400" class="modal fade">
    <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
      <!-- 400 Modal edit HTML -->
      <div class="modal-content" v-show="userStore.resStatus == 400">
        <div class="modal-header flex-column">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
              class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
            </svg>
          </div>
          <h4 class="modal-title w-100">คุณอีเมลนี้ถูกใช้ไปแล้ว !</h4>
        </div>
        <div class="modal-body">
          <p>กรุณาตรวจสอบอีเมลของคุณให้ถูกต้อง เนื่องจากอีเมลนี้ถูกใช้ไปแล้ว</p>
        </div>
      </div>

      <div class="modal-content" v-show="email_ == 0 || !validateEmail(email_)">
        <div class="modal-header flex-column">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
              class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
            </svg>
          </div>
          <h4 class="modal-title w-100">อีเมลนี้ไม่ถูกต้อง !</h4>
        </div>
        <div class="modal-body">
          <p>กรุณาตรวจสอบอีเมลของคุณให้ถูกต้อง เนื่องจากอีเมลนี้ไม่ถูกต้อง</p>
        </div>
      </div>

      <div class="modal-content" v-show="
        !email_ == 0 && validateEmail(email_) && userStore.resStatus == 200
      ">
        <div class="modal-header flex-column">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
              class="bi bi-emoji-sunglasses-fill" viewBox="0 0 16 16">
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z" />
            </svg>
          </div>
          <h4 class="modal-title w-100">อีเมลถูกต้อง !</h4>
        </div>
        <div class="modal-body">
          <p>คุณสามารถสร้าง OASIP ID ด้วยอีเมลนี้ได้</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Varela Round", sans-serif;
}

svg {
  fill: #636363;
}

svg:hover {
  fill: red;
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

.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
