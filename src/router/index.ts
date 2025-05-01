import {createRouter, createWebHistory} from "vue-router";

import type {RouteRecordRaw} from "vue-router"
import MainLayout from "../layouts/Layout.vue";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import NotFound from "../components/NotFound.vue";
import OrderView from "../views/OrderView.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/Login.vue";
import MeasureView from "../views/MeasureView.vue";
import IncomeView from "../views/IncomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        redirect: "/dashboard",
        component: MainLayout,
        meta: {requiresAuth: true},
        children: [
            {
                path: "/dashboard",
                name: "DashboardView",
                component: HomeView,
                meta: {requiresAuth: true}
            },
            {
                path: "/products",
                name: "ProductView",
                component: ProductView,
                meta: {requiresAuth: true}
            },
            {
                path: "/orders",
                name: "OrdersView",
                component: OrderView,
                meta: {requiresAuth: true}
            },
            {
                path: "/measures",
                name: "MeasureView",
                component: MeasureView,
                meta: {requiresAuth: true}
            },
            {
                path:"/incomes",
                name:"IncomeView",
                component: IncomeView,
                meta: {requiresAuth: true}
            }
        ]
    },
    {
        path: "/signup",
        name: 'SignUp',
        component: SignUp
    },
    {
        path: "/login",
        name: 'Login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    if (to.meta.requiresAuth && !isLoggedIn) {
        next("/login");
    }
    else if ((to.path === "/login" || to.path === "/signup") && isLoggedIn) {
        next("/dashboard");
    }
    else {
        next();
    }
});


export default router