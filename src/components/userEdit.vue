<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsers } from "../stores/users.js";

const router = useRouter();
const userStore = useUsers();

const props = defineProps({
  userz: {
    type: Object,
    require: true,
    default: {},
  },
});

const firstname = ref(props.userz.name.split(' ')[0]);
const lastname = ref(props.userz.name.split(' ')[1]);
const role_ = ref("นักศึกษา");
const emailStatus = ref(2);

const editUser = async (id) => {
  await userStore.editUser(id, { role: role_.value == 'นักศึกษา' ? 'student' : role_.value == 'อาจารย์' ? 'lecturer' : 'admin', name: firstname.value + " " + lastname.value });
};

const clearForm = () => {
  firstname.value = "";
  lastname.value = "";
  role_.value = "นักศึกษา";
  emailStatus.value = 2;
};

</script>

<template>
  <div>
    <section class="py-4 py-xl-5" style="background: #f5f5f7">
      <div class="container">
        <div class="row gy-4 gy-md-0">
          <div
            class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
            style="margin: 60px">
            <div style="max-width: 350px">
              <h2 class="text-uppercase fw-bold">แก้ไขข้อมูลของผู้ใช้งาน</h2>
              <p class="my-3">คุณสามารถแก้ข้อมูลเกี่ยวกับ OASIP ID</p>
            </div>
          </div>
        </div>
      </div>
      <div class="position-relative" style="background: #f5f5f7">
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
                      <option>แอดมิน</option>
                    </select>
                  </div>
                  <div>
                    <div class="row mb-3">
                      <div class="col-md-6 form-floating mb-3">
                        <input type="text" v-model="firstname" class="form-control" id="floatingInput" name="name"
                          minlength="1" maxlength="50" placeholder="ชื่อ" />
                        <label for="floatingInput">ชื่อ</label>
                      </div>
                      <div class="col-md-6 form-floating mb-3">
                        <input v-model="lastname" class="form-control" type="text" id="floatingInput" name="lastname"
                          minlength="1" maxlength="50" placeholder="นามสกุล" />
                        <label for="floatingInput">นามสกุล</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse bd-highlight">
                    <button class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem"
                      @click="router.push(`/Userinfo/${props.userz.id}`)">
                      ยกเลิก
                    </button>
                    <button class="btn btn-primary btn-sm mx-4" type="button" data-bs-toggle="modal"
                      data-bs-target="#myModal" style="--bs-btn-border-radius: 1rem"
                      :disabled="!(time != 0 && startTime != 0)" @click="">
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal edit HTML -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
        <!-- con Modal edit HTML -->
        <div class="modal-content">
          <div class="modal-header flex-column">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
                class="bi bi-exclamation" viewBox="0 0 16 16">
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
            </div>

            <h4 class="modal-title w-100">คุณต้องการจะแก้ไข OASIP ID ?</h4>
          </div>
          <div class="modal-body">
            <p>
              หากคุณแก้ไขOASIP ID ของคุณไปแล้ว
              ข้อมูลของคุณจะถูกเปลี่ยนไปตามที่คุณต้องการ
            </p>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary rounded-pill" data-dismiss="modal"
              @click="
  editUser(props.userz.id);
router.push(`/Userinfo/${props.userz.id}`);
              ">
              ยืนยัน
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-danger rounded-pill">
              ยกเลิก
            </button>
          </div>
        </div>
        <!-- conf Modal edit HTML -->
        <!-- 400 Modal edit HTML -->
        <div id="myModal" class="modal fade">
          <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
            <div class="modal-content" v-show="userStore.resStatus == 400">
              <div class="modal-header flex-column">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                <div class="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
                    class="bi bi-exclamation" viewBox="0 0 16 16">
                    <path
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                </div>

                <h4 class="modal-title w-100">คุณอีเมลนี้ถูกใช้ไปแล้ว !</h4>
              </div>
              <div class="modal-body">
                <p>
                  หากคุณต้องการจะแก้ไขข้อมูล OASIP ID
                  กรุณาใช้ชื่อและอีเมลให้ถูกต้อง
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 400 Modal edit HTML -->

        <!-- 401 Modal edit HTML -->
        <div id="myModal" class="modal fade">
          <div class="modal-dialog modal-confirm modal-lx modal-dialog-centered">
            <div class="modal-content" v-show="userStore.resStatus == 401">
              <div class="modal-header flex-column">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                <div class="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
                    class="bi bi-exclamation" viewBox="0 0 16 16">
                    <path
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                </div>

                <h4 class="modal-title w-100">คุณชื่อนี้ถูกใช้ไปแล้ว !</h4>
              </div>
              <div class="modal-body">
                <p>
                  หากคุณต้องการจะแก้ไขข้อมูล OASIP ID
                  กรุณาใช้ชื่อและอีเมลให้ถูกต้อง
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 401 Modal edit HTML -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-select,
.form-control {
  border: none;
  border-bottom: 1px solid #000000;
  border-radius: 5;
}

.form-select:focus,
.form-control:focus {
  box-shadow: none;
  border-bottom-color: #2196f3;
}

.scale:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 0.15rem rgb(129, 128, 128));
}

.list-group {
  max-height: 300px;
}

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
  border: 4px solid rgb(250, 231, 62);
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
