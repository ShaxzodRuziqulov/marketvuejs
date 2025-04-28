<template>
  <div class="min-h-screen bg-gray-50 p-8">

    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Bosh Sahifa</h1>
      <button
          @click="logout"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
        Logout
      </button>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Mahsulotlar</h2>
        <p class="text-4xl font-bold text-gray-800 mt-2">{{ productCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Buyurtmalar</h2>
        <p class="text-4xl font-bold text-gray-800 mt-2">{{ orderCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Kirimlar</h2>
        <p class="text-4xl font-bold text-gray-800 mt-2">{{ incomeCount }}</p>
      </div>
    </section>

    <section class="space-y-12">

      <div>
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Ombordagi mahsulotlar ro'yhati</h2>
        <div class="overflow-x-auto bg-white shadow rounded-2xl">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gray-100 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 text-left">ID</th>
              <th class="px-6 py-4 text-left">Mahsulot</th>
              <th class="px-6 py-4 text-left">Miqdori</th>
              <th class="px-6 py-4 text-left">O'lchov</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="warehouse in wareHouses" :key="warehouse.id">
              <td class="px-6 py-4">{{ warehouse.id }}</td>
              <td class="px-6 py-4">{{ getProductName(warehouse.productsId) }}</td>
              <td class="px-6 py-4">{{ warehouse.quantity }}</td>
              <td class="px-6 py-4">{{ getMeasureName(warehouse.measureId) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Yangi Kirimlar</h2>
        <div class="overflow-x-auto bg-white shadow rounded-2xl">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gray-100 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 text-left">ID</th>
              <th class="px-6 py-4 text-left">Mahsulot</th>
              <th class="px-6 py-4 text-left">Narxi</th>
              <th class="px-6 py-4 text-left">Miqdori</th>
              <th class="px-6 py-4 text-left">O'lchov</th>
              <th class="px-6 py-4 text-left">Yaratilgan sanasi</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="income in incomes" :key="income.id" class="border-t hover:bg-gray-50">
              <td class="px-6 py-4">{{ income.id }}</td>
              <td class="px-6 py-4">{{ getProductName(income.productsId) }}</td>
              <td class="px-6 py-4">{{ income.price.toLocaleString() }} so'm</td>
              <td class="px-6 py-4">{{ income.quantity }}</td>
              <td class="px-6 py-4">{{ getMeasureName(income.measureId) }}</td>
              <td class="px-6 py-4">{{ formDate(income.createdAt) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="orders.length">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Buyurtmalar</h2>
        <div class="overflow-x-auto bg-white shadow rounded-2xl">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gray-100 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 text-left">ID</th>
              <th class="px-6 py-4 text-left">Mahsulot</th>
              <th class="px-6 py-4 text-left">Miqdori</th>
              <th class="px-6 py-4 text-left">O'lchov</th>
              <th class="px-6 py-4 text-left">Yaratilgan sanasi</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-t hover:bg-gray-50">
              <td class="px-6 py-4">{{ order.id }}</td>
              <td class="px-6 py-4">{{ getProductName(order.productsId) }}</td>
              <td class="px-6 py-4">{{ order.quantity }}</td>
              <td class="px-6 py-4">{{ getMeasureName(order.measureId) }}</td>
              <td class="px-6 py-4">{{ formDate(order.createdAt) }}</td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </section>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Income, Measures, Orders, Product, WareHouse} from "../models/Product.js";
import {ApiService} from "../service/ApiService.ts";
import {DashboardService} from "../service/DashboardService.ts";
import router from "../router";

const productCount = ref(0);
const orderCount = ref(0);
const incomeCount = ref(0);

const measures = ref<Measures[]>([]);
const products = ref<Product[]>([]);
const wareHouses = ref<WareHouse[]>([]);
const incomes = ref<Income[]>([]);
const orders = ref<Orders[]>([]);

const loadStats = async () => {
  try {
    const [products, orders, incomes] = await Promise.all([
      DashboardService.getProductCount(),
      DashboardService.getOrderCount(),
      DashboardService.getIncomeCount(),
    ]);
    productCount.value = products.data;
    orderCount.value = orders.data;
    incomeCount.value = incomes.data;
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const loadAllData = async () => {
  try {
    const [productRes, warehouseRes, measureRes, incomeRes, orderRes] = await Promise.all([
      ApiService.getAllProducts(),
      ApiService.getAllWarehouses(),
      ApiService.getAllMeasures(),
      ApiService.activeIncome(),
      ApiService.activeOrder(),
    ]);
    products.value = productRes.data;
    wareHouses.value = warehouseRes.data;
    measures.value = measureRes.data;
    incomes.value = incomeRes.data;
    orders.value = orderRes.data;
  } catch (error) {
    console.error("Xatolik yuklashda:", error);
  }
};

const getProductName = (id: number): string => {
  const product = products.value.find(p => p.id === id);
  return product ? product.name : "Noma’lum mahsulot";
};

const getMeasureName = (id: number): string => {
  const measure = measures.value.find(m => m.id === id);
  return measure ? measure.name : "Noma’lum o‘lchov";
};


const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const formDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
onMounted(() => {
  loadAllData();
  loadStats();
});
</script>
