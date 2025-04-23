<template>
  <div class="flex items-center justify-center w-full h-full text-black gap-4">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold text-center text-red-600">
        Ro'yhatdan o'tish
      </h2>

      <form @submit.prevent="handleSignUp" class="flex flex-col space-y-4">
        <input
            v-model="form.firstname"
            placeholder="First name"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <input
            v-model="form.lastname"
            placeholder="Last name"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
        <input
            v-model="form.username"
            placeholder="Username"
            required
            class=" w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        <input
            v-model="form.password"
            placeholder="Password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                type="submit">
          Tasdiqlash
        </button>
        <p
            class="justify-center text-center font-medium text-sm text-gray-500">
          {{ message }}
        </p>
      </form>

    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {RegisterUser} from "../models/Product.ts";
import {AuthService} from "../service/AuthService.ts";
import {useRouter} from "vue-router";

const form = ref<RegisterUser>({
  lastname: "",
  username: "",
  password: "",
  firstname: ""
})
const router = useRouter()
const message = ref('')

const handleSignUp = async () => {
  try {
    await AuthService.signUp(form.value)
    await router.push({name: "Dashboard"})
  } catch (e) {
    console.error(e)
    message.value = "Hatolik mavjud"
  }
}
</script>

<style scoped>

</style>