<template>
  <div class="p-6 bg-gray-100 min-h-screen">

    <button
        @click="logout"
        class="absolute right-10 py-2 px-3 bg-blue-40 border rounded-sm font-semibold justify-center hover:bg-blue-500 transition duration-200">Logout
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-gray-500 text-sm font-semibold">Jami Mahsulotlar</h2>
        <p class="text-3xl font-bold text-gray-800 mt-2">{{ productCount }}</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-gray-500 text-sm font-semibold">Jami Buyurtmalar</h2>
        <p class="text-3xl font-bold text-gray-800 mt-2">{{ orderCount }}</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-gray-500 text-sm font-semibold">Jami Kirimlar</h2>
        <p class="text-3xl font-bold text-gray-800 mt-2">{{ incomeCount }}</p>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Eng so‘nggi kirimlar</h2>
      <table class="w-full text-left border-collapse">
        <thead>
        <tr class="bg-gray-100 text-sm text-gray-600">
          <th class="p-3">#</th>
          <th class="p-3">Mahsulot</th>
          <th class="p-3">Miqdor</th>
          <th class="p-3">Sana</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(income, index) in incomesForDisplay" :key="income.id" class="border-t text-sm">
          <td class="p-3">{{ index + 1 }}</td>
          <td class="p-3">{{ income.productName }}</td>
          <td class="p-3">{{ income.quantity }} {{ income.measureName }}</td>
          <td class="p-3">{{ income.date }}</td>
        </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import router from "../router";
import {DashboardService} from "../service/DashboardService.ts";

const productCount = ref(0)
const orderCount = ref(0)
const incomeCount = ref(0)


const latestIncomes = ref<Array<any>>([])

const loadStats = async () => {
  try {
    const [products, orders, incomes, latest] = await Promise.all([
      DashboardService.getProductCount(),
      DashboardService.getOrderCount(),
      DashboardService.getIncomeCount(),
      DashboardService.getLatestIncomes()
    ])
    productCount.value = products.data
    orderCount.value = orders.data
    incomeCount.value = incomes.data
    latestIncomes.value = latest.data
  } catch (error) {
    console.error("Xatolik:", error)
  }
}

// const loadChart = async () => {
//   try {
//     const res = await DashboardService.getChartData()
//     const ctx = document.getElementById('productChart') as HTMLCanvasElement
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: res.data.labels,
//         datasets: [{
//           label: 'Mahsulotlar soni',
//           data: res.data.values,
//           backgroundColor: '#3b82f6'
//         }]
//       }
//     })
//   } catch (error) {
//     console.error("Chart yuklashda xatolik:", error)
//   }
// }

const incomesForDisplay = computed(() => {
  return (latestIncomes.value || []).map(income => ({
    ...income,
    date: income.created_at ? income.created_at.slice(0, 10) : '—'
  }))
})

onMounted(() => {
  loadStats()
})

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
</style>
