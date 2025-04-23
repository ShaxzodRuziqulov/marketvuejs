<script setup lang="ts">
</script>

<template>
  <div
      class="fixed top-0 left-0 w-full h-16 px-6 bg-gray-800 text-white flex items-center justify-between z-50 shadow-md">
    <a href="/" class="text-2xl font-semibold whitespace-nowrap">Logo</a>

    <div class="flex items-center space-x-4">
      <router-link
          to="/"
          class="py-2 px-3 rounded-sm hover:bg-gray-700 transition duration-200"
      >Home
      </router-link>

      <router-link
          to="/products"
          class="py-2 px-3 rounded-sm hover:bg-gray-700 transition duration-200"
      >Products
      </router-link>

      <router-link
          to="/measures"
          class="py-2 px-3 rounded-sm hover:bg-gray-700 transition duration-200"
      >Measures
      </router-link>

      <router-link
          to="/orders"
          class="py-2 px-3 rounded-sm hover:bg-gray-700 transition duration-200"
      >Orders
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
