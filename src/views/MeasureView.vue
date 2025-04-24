<template>
  <div class="p-6 max-w-2xl mx-auto">
    <div class="bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 border border-gray-100">
      <form @submit.prevent="handleSubmit">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">
          {{ isEditing ? "O‘lchovni tahrirlash" : "Yangi o‘lchov qo‘shish" }}
        </h2>

        <label class="block text-gray-700 font-medium mb-1">O‘lchov nomi:</label>
        <input
            v-model="form.name"
            type="text"
            class="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg p-3 w-full mb-4 placeholder-gray-400 transition-all duration-200"
            placeholder="Masalan: dona, kg, litr..."
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <div
            class="flex gap-2">
          <button
              type="submit"
              class=" required bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
            {{ isEditing ? "Yangilash" : "Saqlash" }}
          </button>
          <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="bg-gray-400 hover:bg-gray-500 transition-colors duration-200 text-white px-5 py-2.5 rounded-lg font-semibold shadow"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>

    <div v-if="measures.length" class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">O‘lchovlar ro‘yxati</h2>
      <ul class="space-y-3">
        <li
            v-for="item in measures"
            :key="item.id"
            class="bg-white shadow-md border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-lg transition-shadow"
        >
          <span class="text-gray-800 font-medium">{{ item.name }}</span>
          <div class="flex gap-2">
            <button
                @click="editMeasure(item)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md font-medium transition-colors duration-200 shadow-sm"
            >
              Edit
            </button>
            <button
                @click="deleteMeasure(item.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors duration-200 shadow-sm"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {ApiService} from '../service/ApiService'
import type {updateMeasure} from "../models/Product.ts";

const form = ref<updateMeasure>({name: '', id: 0})
const measures = ref<updateMeasure[]>([])
const isEditing = ref(false)
const errorMessage = ref('')

const loadMeasures = async () => {
  const response = await ApiService.getAllMeasures()
  measures.value = response.data
}

const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    errorMessage.value = "Iltimos, o‘lchov nomini kiriting."
    return
  }

  errorMessage.value = ""
  try {
    if (isEditing.value && form.value.id) {
      await ApiService.updateMeasure(form.value.id, form.value)
    } else {
      await ApiService.createMeasure({name: form.value.name})
    }
    resetForm()
    await loadMeasures()
  } catch (error) {
    console.error('Xatolik:', error)
  }
}

const editMeasure = (measure: updateMeasure) => {
  form.value = {...measure}
  isEditing.value = true
}

const deleteMeasure = async (id: number) => {
  if (confirm("O'chirishga ishonchingiz komilmi?")) {
    await ApiService.deleteMeasure(id)
    await loadMeasures()
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = {name: '', id: 0}
  isEditing.value = false
}

onMounted(() => {
  loadMeasures()
})
</script>
