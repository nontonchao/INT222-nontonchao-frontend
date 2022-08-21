<script setup>

</script>

<template>
    <div>
        <section class="py-4 py-xl-5" style="background: #f5f5f7;">
            <div class="container">
                <div class="text-center p-4 p-lg-5">
                    <h1 class="fw-bold mb-4 display-5" style="margin: 125px;">Online Appointment <br>Scheduling System
                        for<br>Integrated Project Clinics (OASIP)<br></h1>
                    <figure style="margin: 0px;padding: 45px;">
                        <blockquote class="blockquote">
                            <p class="mb-5 display-6">มีปัญหาปรึกษาใครดี?</p>
                        </blockquote>
                        <figcaption class="blockquote-footer" style="font-size: 20px;">ให้ OASIP ช่วยคุณ</figcaption>
                    </figure><button class="btn btn-danger fs-5 me-2 py-2 px-4" type="button"
                        style="margin: -57px 0px;--bs-primary-rgb: 220,53,69;padding: 0px 24px; --bs-btn-border-radius: 1rem;">
                        <router-link :to="{ name: 'AddEvent' }" style="text-decoration:none; color:#ffffff">
                            จองนัดหมายเลย
                        </router-link>
                    </button>
                </div>
            </div>
        </section>
        <section class="py-4 py-xl-5">
            <div class="container py-4 py-xl-5" style="background: #ffffff;">
                <div class="row mb-5">
                    <div class="col-md-8 col-xl-6 text-center mx-auto">
                        <h2 class="fw-bold display-3" style="font-size: 55px;">Features</h2>
                        <p class="w-lg-50">ประสบการณ์และสิ่งเจ๋งๆที่ OASIP-SY1 จะมอบให้คุณ</p>
                    </div>
                </div>
                <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center border-bottom "
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="0 0 20 20" class="bi bi-bell">
                                    <path
                                        d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>จองการนัดหมาย</h4><router-link :to="{
                                    name: 'AddEvent',
                                }">จองตอนนี้ &gt;</router-link>
                                <p
                                    style="padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    สามารถจองการนัดหมายได้อย่างสะดวก และง่ายดาย
                                    เพียงไม่กี่คลิกก็สามารถจองนัดหมายได้แล้ว<br></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center border-bottom "
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="0 0 20 20" class="bi bi-bezier">
                                    <path fill-rule="evenodd"
                                        d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>ตรวจสอบนัดหมาย</h4><router-link :to="{
                                    name: 'CheckEvent',
                                }">ตรวจสอบตอนนี้ &gt;</router-link>
                                <p
                                    style="padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    สามารถตรวจสอบการนัดหมายได้ ไม่ว่าจะเป็นการตรวจสอบทั้งหมด การตรวจสอบ / ค้นหาจาก
                                    Email<br></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center border-bottom "
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="8 1 1 20">
                                    <path
                                        d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>แก้ไขนัดหมาย</h4><a href="#">แก้ไขตอนนี้ &gt;</a>
                                <p
                                    style="padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    หากต้องการแก้ไขการนัดหมายก็สามารถทำได้เองโดยไม่ต้องยุ่งยาก<br></p><br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center"
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="0 0 20 20" class="bi bi-bell">
                                    <path
                                        d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>ยกเลิกนัดหมาย</h4><a href="#">ยกเลิกตอนนี้ &gt;</a>
                                <p
                                    style="padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    หากนัดหมายไปแล้วไม่สะดวก หรือต้องการยกเลิกนัดหมายก็สามารถทำได้เลย<br></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center"
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="0 0 20 20" class="bi bi-bezier">
                                    <path fill-rule="evenodd"
                                        d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>RealTime</h4><a href="#">รวดเร็วและทันท่วงที</a>
                                <p
                                    style="padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    อัพเดทข้อมูลเรียลไทม์ตลอด หลีกเลี่ยงปัญหาการจองซ้อนทับกัน<br></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-center d-flex flex-column align-items-center align-items-xl-center"
                            style="padding: 30px;">
                            <div
                                class="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                    viewBox="0 0 20 20" class="bi bi-flag">
                                    <path
                                        d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578">
                                    </path>
                                </svg>
                            </div>
                            <div class="px-3">
                                <h4>แก้ไขหมวดหมู่</h4><router-link :to="{
                                    name: 'EventCategoryList',
                                }">แก้ไขตอนนี้ &gt;</router-link>
                                <p
                                    style="--bs-primary: #dc3545;--bs-primary-rgb: 220,53,69;padding: 35px;padding-top: 35px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                                    สามารถแก้ไขชื่อหมวดหมู่ และระยะเวลาในการนัดหมายได้ตามที่ต้องการ<br></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.bs-icon.bs-icon-primary {
    background: #dc3545;
}
</style>