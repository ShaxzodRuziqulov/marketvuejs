import {createRouter, createWebHistory} from "vue-router";

import type {RouteRecordRaw} from "vue-router"
import MainLayout from "../layouts/Layout.vue";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import NotFound from "../components/NotFound.vue";
import OrderView from "../views/OrderView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        redirect: "/dashboard",
        component: MainLayout,
        children: [
            {
                path: "/dashboard",
                name: "DashboardView",
                component: HomeView
            }, {
                path: "/products",
                name: "ProductView",
                component: ProductView
            }, {
                path: "/orders",
                name: "OrdersView",
                component: OrderView
            }
        ],
    },
    {
        path:
            '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router