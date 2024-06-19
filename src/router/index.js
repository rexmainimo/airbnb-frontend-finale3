import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from "../components/homePage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: () => import('../pages/userLogin.vue')
  },
  {
    path: '/ownerLogin',
    name: 'ownerLogin',

    component: () => import ('../pages/ownerLogin.vue')
  },
  {
    path: '/userSignIn',
    name: 'userSignIn',

    component: () => import ('../pages/userSignIn.vue')
  },
  {
    path: '/ownerSignIn',
    name: 'ownerSignIn',

    component: () => import ('../pages/ownerSignIn.vue')
  },
  {
    path: '/userHome',
    name: 'userHome',

    component: () => import ('../pages/userHome.vue'),
    props: true,
  },
  {
    path: '/userDetails',
    name: 'userDetails',

    component: () => import ('../pages/userDetails.vue')
  },
  {
    path: '/userBooking',
    name: 'userBooking',

    component: () => import ("../pages/userBooking.vue"),
    props: true
  },
  {
    path: "/bookingHistory",
    name: "myBookings",

    component: () => import ("../pages/bookingHistory.vue")
  },
  {
    path: "/ownerHome",
    name: "/ownerHome",

    component: () => import ("../pages/ownerHome.vue")
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
  
export default router