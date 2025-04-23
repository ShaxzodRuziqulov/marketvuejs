<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-center text-red-600 mb-6">
        Tizimga kirish
      </h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col space-y-6">
        <input
            type=""
            id="username"
            v-model="form.username"
            placeholder="Username"
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                type="submit">
          Tizimga kirish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {LoginUser} from "../models/Product.ts";
import {useRouter} from "vue-router";
import {AuthService} from "../service/AuthService.ts";

const form = ref<LoginUser>({
  username: "",
  password: "",
});

const router = useRouter()
const handleSubmit = async () => {
  try {
    const response = await AuthService.login(form.value);

    localStorage.setItem("token", response?.token);
    console.log(response);
    await router.push({name: "DashboardView"});
  } catch (err) {
    console.log(err);
    alert("Tizimga kirishda xatolik: Login yoki parolda hatolik bor");
  }
}


</script>

<style scoped>

</style>