<script setup>
import { onBeforeMount, ref } from "vue";
import { useLogin } from "../stores/login.js";
import { useRouter } from "vue-router";

const loginStore = useLogin();
const router = useRouter();

onBeforeMount(async () => {
    loginStore.isLogin();
});

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
                            <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"
                                    fill="currentColor" class="bi bi-cloud-moon" viewBox="0 1 19 16">
                                    <path
                                        d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .625.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .509-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                                    <path
                                        d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z" />
                                </svg></a>
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
                        <li class="nav-item" v-show="loginStore.isAdmin">
                            <a class="nav-link" href="javascript:;">
                                <router-link class="routerLink" :to="{
                                    name: 'ShowUser',
                                }">ผู้ใช้ทั้งหมด (สำหรับแอดมิน)
                                </router-link>
                            </a>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="javascript:;">
                                <router-link class="routerLink" :to="{
                                    name: 'EditEvent',
                                }">EditEvent</router-link>
                            </a>
                        </li> -->
                        <li class="nav-item d-none d-xs-block d-md-block">
                            <router-link class="routerLink" :to="{
                                name: 'Login',
                            }">
                                <button @click="loginStore.logout();router.push(`/login`);location.reload();"
                                    v-if="loginStore.isLogin() == true" class="btn btn-danger btn-sm" type="button"
                                    style="--bs-btn-border-radius: 1rem">
                                    ออกจากระบบ
                                </button>
                                <button v-else class="btn btn-danger btn-sm" type="button"
                                    style="--bs-btn-border-radius: 1rem">
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
.routerLink {
    text-decoration: none;
    color: #b9b9b9;
}

.routerLink:hover {
    color: #ffffff;
}
</style>
