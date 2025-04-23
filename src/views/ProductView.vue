<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-4 bg-white rounded shadow">
    <div class="mb-4">
      <label class="block font-semibold">Mahsulot nomi</label>
      <input
          v-model="form.name"
          type="text"
          class="border rounded w-full px-3 py-2"
          placeholder="Mahsulot nomi"
          required
      />
    </div>

    <div class="mb-4">
      <label class="block font-semibold">Tavsifi</label>
      <textarea
          v-model="form.description"
          class="border rounded w-full px-3 py-2"
          rows="3"
          placeholder="Tavsifi"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="block font-semibold">O‘lchov birligi</label>
      <select
          v-model="form.measureId"
          class="border rounded w-full px-3 py-2"
          required
      >
        <option disabled value="">Tanlang...</option>
        <option
            v-for="measure in measures"
            :key="measure.id"
            :value="measure.id"
        >
          {{ measure.name }}
        </option>
      </select>
    </div>

    <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Saqlash
    </button>

    <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {ApiService} from '../service/ApiService.ts'
import type {createProduct, Measure} from '../models/Product.ts'

const form = reactive<createProduct>({
  id: 0,
  name: '',
  description: '',
  measureId: 0,
})

const measures = ref<Measure[]>([])

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await ApiService.getMeasures()
    measures.value = res.data
  } catch (e) {
    console.error('O‘lchov birliklarini olishda xatolik:', e)
  }
})

async function handleSubmit() {
  if (!form.name || !form.measureId) {
    errorMessage.value = 'Iltimos, barcha majburiy maydonlarni to‘ldiring.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await ApiService.createProduct(form)
    successMessage.value = 'Mahsulot muvaffaqiyatli yaratildi'
    form.name = ''
    form.description = ''
    form.measureId = 0
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.'
  } finally {
    loading.value = false
  }
}
</script>
