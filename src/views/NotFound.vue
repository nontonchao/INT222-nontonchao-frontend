<script setup>

</script>

<template>
    <div>
        <section class="py-4 py-xl-5" style="background: #f5f5f7;">
            <div class="container">
                <div class="text-center p-4 p-lg-5">
                    <h1 class="fw-bold mb-4 display-5" style="margin: 125px;">กำลังมองหาอะไรอยู่หรอ?</h1>
                    <p class="text-muted display-6">เราไม่มีหน้าเพจนี้ :(</p>
                    <button class="btn btn-danger fs-5 me-2 py-2 px-4" type="button"
                        style="margin: 100px 0px;--bs-primary-rgb: 220,53,69;padding: 0px 24px;--bs-btn-border-radius: 1rem;">
                        <router-link :to="{ name: 'Home' }" style=" text-decoration: none; color:#ffffff;">กลับหน้าหลัก
                        </router-link>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
</style>