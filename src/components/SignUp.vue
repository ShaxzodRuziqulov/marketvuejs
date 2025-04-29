<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg flex w-full max-w-5xl overflow-hidden">

      <div class="w-full md:w-1/2 p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Create your Account</h2>

        <form @submit.prevent="handleSignUp" class="space-y-4">
          <div class="flex gap-4">
            <input v-model="form.firstname" type="text" placeholder="First name"
                   class="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required/>
            <input v-model="form.lastname" type="text" placeholder="Last name"
                   class="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required/>
          </div>

          <input v-model="form.username" type="text" placeholder="Username"
                 class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required/>
          <input v-model="form.password" type="password" placeholder="Password"
                 class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required/>

          <button type="submit"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">Create an account
          </button>

          <div class="flex items-center gap-2">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="text-gray-400 text-sm">or</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <p class="text-sm text-gray-500 text-center mt-4">Already have an account? <a href="/login"
                                                                                        class="text-blue-600 hover:underline">Login
            here</a></p>
        </form>
      </div>

      <div class="hidden md:flex w-1/2 bg-gray-50 items-center justify-center">
        <img src="../assets/image_2025-04-29_10-56-28.png" alt="Illustration" class="max-w-1xs h-auto">
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import type {RegisterUser} from '../models/Product.ts'
import {AuthService} from '../service/AuthService.ts'

const form = ref<RegisterUser>({
  firstname: '',
  lastname: '',
  username: '',
  password: ''
})
const router = useRouter()
const handleSignUp = async () => {
  try {
    await AuthService.signUp(form.value)
    await router.push('/dashboard')
  } catch (e) {
    console.error(e)
  }
}
</script>
