<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
      <div class="p-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
        <p class="text-sm text-gray-500 mb-6">
          Start your website in seconds. Don’t have an account?
          <a href="/signup" class="text-blue-600 hover:underline">Sign up.</a>
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
            <input
                id="username"
                type="text"
                v-model="form.username"
                placeholder="username"
                required
                class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
                id="password"
                type="password"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
              type="submit"
          >
            Sign in to your account
          </button>
        </form>
      </div>

      <div class="hidden md:flex items-center justify-center bg-gray-100">
        <img src="../assets/image_2025-04-29_10-56-28.png" alt="Illustration" class="max-w-1xs h-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {LoginUser} from '../models/Product.ts';
import {useRouter} from 'vue-router';
import {AuthService} from '../service/AuthService.ts';

const form = ref<LoginUser>({
  username: '',
  password: '',
});

const router = useRouter();
const handleSubmit = async () => {
  try {
    const response = await AuthService.login(form.value);
    localStorage.setItem('token', response?.token);
    await router.push({name: 'DashboardView'});
  } catch (err) {
    alert('Tizimga kirishda xatolik: Login yoki parolda hatolik bor');
  }
};
</script>

<style scoped>
</style>
