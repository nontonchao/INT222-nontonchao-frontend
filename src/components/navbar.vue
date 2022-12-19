<script setup>
import { useLogin } from "../stores/login.js";
import { useRouter } from "vue-router";

const loginStore = useLogin();
const router = useRouter();
</script>

<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-dark navbar--apple">
      <div class="container">
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#menu">
          <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav flex-grow-1 justify-content-between">
            <li class="nav-item d-none d-xs-block d-md-block">
              <p class="nav-name" href="#" style="color: ">
                <img src="../assets/logo.png" width="40" height="28" />
                <small v-show="loginStore.isLoggedIn == true" style="padding: 1.5em">
                  {{ loginStore.name.split(" ")[0].toUpperCase() }} |
                  {{ loginStore.roles.split('_')[1] }}</small>
              </p>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">
                <router-link class="routerLink" :to="{
                  name: 'Home',
                }">หน้าหลัก</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">
                <router-link class="routerLink" :to="{
                  name: 'CheckEvent',
                }">ตรวจสอบนัดหมาย</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">
                <router-link class="routerLink" :to="{
                  name: 'EventCategoryList',
                }">คลินิก</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">
                <router-link class="routerLink" :to="{
                  name: 'AboutUs',
                }">เกี่ยวกับเรา</router-link>
              </a>
            </li>

            <div v-if="loginStore.roles === 'ROLE_ADMIN'" class="dropdown">
              <button class="btn btn-opacity-0 dropdown-toggle text-white btn-admin btn-sm border-0" type="button"
                id="dropdownmenu" data-bs-toggle="dropdown" aria-expanded="false">
                เมนูจัดการ (สำหรับแอดมิน)
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownmenu">
                <router-link style="color: black !important" class="dropdown-item" :to="{
                  name: 'ShowUser',
                }"><a class="dropdown-item" href="#">
                    ผู้ใช้ทั้งหมด
                  </a></router-link>
                <router-link style="color: black !important" class="dropdown-item" :to="{
                  name: 'EventCategoryList',
                }"><a class="dropdown-item" href="#">
                    จัดการคลินิก
                  </a></router-link>
              </div>
            </div>
            <!-- <li><button @click="loginStore.logoff()">LOGOFF MICROSOFT</button></li>
            <li><button @click="loginStore.getAccount()">getAccount</button></li> -->
            <li class="nav-item d-none d-xs-block d-md-block">
              <router-link class="routerLink" :to="{
                name: 'Login',
              }">
                <button @click="
                  loginStore.logout();
                  router.push(`/login`);
                " v-if="
  loginStore.isLogin() == true ||
  loginStore.isLoggedIn == true
                " class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem">
                  ออกจากระบบ
                </button>
                <button v-else class="btn btn-danger btn-sm" type="button" style="--bs-btn-border-radius: 1rem">
                  ลงชื่อเข้าใช้
                </button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.btn-admin:hover {
  border-style: none;
  color: #b9b9b9;
}

.navbar .nav-item:not(:last-child) {
  margin-right: 35px;
}

.dropdown-toggle::after {
  transition: transform 0.15s linear;
}

.show.dropdown .dropdown-toggle::after {
  transform: translateY(3px);
}

/* ********* */
.nav-name {
  color: #ffffff;
  text-decoration: none;
}

.routerLink {
  text-decoration: none;
  color: #b9b9b9;
}

.routerLink:hover {
  color: #ffffff;
}
</style>
