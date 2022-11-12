import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import AddEvent from "../views/AddEvent.vue";
import AboutUs from "../views/AboutUS.vue";
import CheckEvent from "../views/CheckEvent.vue";
import EventCategoryList from "../views/EventCategoryList.vue";
import ShowUser from "../views/ShowUser.vue";
import EventInfo from "../views/EventInfo.vue";
import AddUser from "../views/AddUser.vue";
import Login from "../views/Login.vue";
import UserInfo from "../views/UserInfo.vue";
import EditEvent from "../views/EditEvent.vue";
import EditUser from "../views/EditUser.vue";

const history = createWebHistory('/sy1/');
const routes = [{
    path: "/",
    name: "Home",
    component: Home,
},
{
    path: "/:catchNotMatchPath(.*)",
    name: "NotFound",
    component: NotFound,
},
{
    path: "/add-event",
    name: "AddEvent",
    component: AddEvent,
},
{
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs,
},
{
    path: "/check-event",
    name: "CheckEvent",
    component: CheckEvent,
},
{
    path: "/event-category",
    name: "EventCategoryList",
    component: EventCategoryList,
},
{
    path: "/show-user",
    name: "ShowUser",
    component: ShowUser,
},
{
    path: "/EventInfo/:event_id",
    name: "EventInfo",
    component: EventInfo,
},
{
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
},
{
    path: "/login",
    name: "Login",
    component: Login,
},
{
    path: "/UserInfo/:user_id",
    name: "UserInfo",
    component: UserInfo,
},
{
    path: "/EditEvent/:event_id",
    name: "EditEvent",
    component: EditEvent,
},
{
    path: "/EditUser/:user_id",
    name: "EditUser",
    component: EditUser,
},

];


const router = createRouter({ history, routes });

export default router;