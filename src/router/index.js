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
import Info from "../views/Info.vue";
import AddUser from "../views/AddUser.vue";
import Login from "../views/Login.vue";






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
    path: "/Info",
    name: "Info",
    component: Info,
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
];


const router = createRouter({ history, routes });

export default router;