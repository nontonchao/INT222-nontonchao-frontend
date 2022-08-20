<script setup>
import { onBeforeMount, ref } from "vue";
import { useEvents } from "../stores/events.js"

const props = defineProps({
    clinic_list: {
        type: Object,
        require: true,
        default: {},
    }
});

const eventStore = useEvents();
const name = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const clinicX = ref("");
const note = ref("");
const startTime = ref("");
const toSend = ref("");
const selectClinic = ref({});

const getCurrDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${numberFormat(
        new Date(today.toString()).getMonth() + 1,
        2
    )}-${numberFormat(new Date(today.toString()).getDate(), 2)}T${today
        .toLocaleTimeString("it-IT")
        .substring(0, 5)}`;
};

const getClinic = (clinicName) => {
    selectClinic.value = props.clinic_list.filter(
        (x) => x.eventCategoryName == clinicName
    )[0];
    console.log(selectClinic.value);
};

const addEvent = async () => {
    toSend.value = {
        // bookingName: name.value,
        bookingName: firstname.value + ' ' + lastname.value,
        bookingEmail: email.value,
        eventStartTime: new Date(startTime.value)
            .toISOString()
            .replace(".000Z", "Z"),
        eventDuration: JSON.stringify(
            props.clinic_list.filter((x) => x.eventCategoryName === clinicX.value)[0]
                .eventDuration
        ),
        eventNotes: note.value,
        eventCategory: {
            id: JSON.stringify(
                props.clinic_list.filter((x) => x.eventCategoryName === clinicX.value)[0]
                    .id
            ),
        },
    };
    eventStore.addEvent(toSend.value);
    if (eventStore.statusCode == 200) {
        console.log("event added :)");
        //toggleQue();
    }
};

const numberFormat = function (number, width) {
    return new Array(+width + 1 - (number + "").length).join("0") + number;
};
</script>

<template>
    <div>
        <section class="py-4 py-xl-5" style="background: #ffffff;">
            <div class="container py-4 py-xl-5">
                <div class="row gy-4 gy-md-0">
                    <div class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"
                        style="margin: 60px;">
                        <div style="max-width: 350px;">
                            <h2 class="text-uppercase fw-bold">จองนัดหมาย</h2>
                            <p class="my-3">คุณสามารถจองนัดหมายตามขั้นตอนดังนี้<br>1. เลือกคลินิกที่ต้องการ<br>2.
                                กรอกข้อมูลผู้นัดหมาย<br>3. เลือกวันและเวลาที่สะดวก<br>4.
                                ยินดีด้วยการนัดหมายของคุณสำเร็จแล้ว!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container py-4 py-xl-5" style="background: #f5f5f7;">
                <div class="row gy-4 gy-md-0">
                    <div class="col-md-6 p-5">
                        <div class="form-check" v-for="(cateList, index) in clinic_list" :key="cateList.id">
                            <input v-model="clinicX" @change="getClinic(clinicX)" class="form-check-input" type="radio"
                                name="flexRadioDefault" :value="cateList.eventCategoryName">
                            <label class="form-check-label">
                                {{ cateList.eventCategoryName }} <small class="text-muted">({{ cateList.eventDuration
                                }} นาที)</small>
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6 d-md-flex align-items-md-center">
                        <div style="max-width: 350px;">
                            <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 1</h2>
                            <p class="my-3">เลือกคลินิกที่ต้องการได้เลย :)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container py-4 py-xl-5 " v-show="clinicX">
                <div class="row gy-4 gy-md-0">
                    <div
                        class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
                        <div style="max-width: 350px;">
                            <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 2</h2>
                            <p class="my-3">บอกเราหน่อยว่าใครกำลังนัดหมาย :)</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form class="mt-1">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="ชื่อ" v-model="firstname">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="นามสกุล" v-model="lastname">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control mt-3" placeholder="อีเมล" v-model="email">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="container py-4 py-xl-5" style="background: #f5f5f7;" v-show="clinicX&&firstname&&lastname&&email" >
                <div class="row gy-4 gy-md-0">
                    <div class="col-md-6">
                        <input type="datetime-local" v-model="startTime" required :min="getCurrDate()" />
                        <div class="p-xl-5 m-xl-5"></div>

                    </div>
                    <div class="col-md-6 d-md-flex align-items-md-center">
                        <div style="max-width: 350px;">
                            <h2 class="text-uppercase fw-bold">ขั้นตอนที่ 3</h2>
                            <p class="my-3">สะดวกเข้าคลินิกวันไหนล่ะ :D</p>
                        </div>
                    </div>
                </div><button class="btn btn-danger" type="button" @click="addEvent()">ยืนยันการจอง</button>
            </div>
        </section>

    </div>
</template>

<style scoped>
</style>