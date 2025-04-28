<template>
  <div class="p-6 max-w-2xl mx-auto">
    <div class="bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 border border-gray-100">
      <form @submit.prevent="handleSubmit">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">
          {{ isEditing ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish" }}
        </h2>

        <label class="block text-gray-700 font-medium mb-1"> Mahsulot nomi</label>
        <input
            v-model="form.name"
            type="text"
            class="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg p-3 w-full mb-4 placeholder-gray-400 transition-all duration-200"
            placeholder="mahsulot kiriting"
            required
        >

        <label class="block text-gray-700 font-medium mb-1"> Mahsulot tavsifi</label>
        <input
            v-model="form.description"
            type="text"
            class="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg p-3 w-full mb-4 placeholder-gray-400 transition-all duration-200"
            placeholder="tavsif kiriting"
            required
        >
        <label class="block text-gray-700 font-medium mb-1"> Mahsulot o'lchov birligi</label>
        <select
            v-model="form.measureId"
            class="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg p-3 w-full mb-4"
            required>
          <option value="" disabled>Birlikni tanlang</option>
          <option
              v-for="measure in measures" :key="measure.id" :value="measure.id">
            {{ measure.name }}
          </option>

        </select>
        <div v-if="isEditing" class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Status</label>
          <select
              v-model="form.status"
              class="border border-gray-300 rounded-lg p-3 w-full mb-4"
              required>
            <option value="" disabled>Holatni tanlang</option>

            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button
              type="submit"
              class="required bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
            {{ isEditing ? "Yangilash" : "Saqlash" }}
          </button>
          <button
              type="button"
              @click="resetForm"
              class="bg-gray-400 hover:bg-gray-500 transition-colors duration-200 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
            Bekor qilish
          </button>
        </div>

      </form>
    </div>

    <div v-if="products.length" class="relative overflow-x-auto mt-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Mahsulotlar ro'yxati</h2>

      <table
          class="w-full text-sm overflow-x-auto text-gray-800 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
        <tr>
          <th class="px-6 py-4 text-left">ID</th>
          <th class="px-6 py-4 text-left">name</th>
          <th class="px-6 py-4 text-left">description</th>
          <th class="px-6 py-4 text-left">Amallar</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="product in products" :key="product.id"
            class="hover:bg-gray-50 transition-all duration-200 border-t border-gray-200">
          <td class="px-6 py-4 text-left">{{ product.id }}</td>
          <td class="px-6 py-4 text-left">{{ product.name }}</td>
          <td class="px-6 py-4 text-left">{{ product.description }}</td>
          <td class="px-6 py-4 text-left">
            <div class="flex gap-2">
              <button
                  @click="editMessage(product)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md font-medium shadow-sm transition-colors duration-200">
                Edit
              </button>
              <button
                  @click="deleteProduct(product.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-medium shadow-sm transition-colors duration-200">
                Delete
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiService} from "../service/ApiService.ts";
import type {createProduct, Measures, Product, updateProduct} from "../models/Product.ts";

const isEditing = ref(false)

const form = ref<createProduct>({
  measureId: 0,
  name: "",
  description: "",
})

const update = ref<updateProduct>(
    {
      status: "",
      id: 0,
      measureId: 0,
      name: "",
      description: ""
    }
)

const measures = ref<Measures[]>([])
const products = ref<Product[]>([])

const handleSubmit = async () => {
  try {
    if (isEditing.value && update.value.id) {
      await ApiService.updateProduct(update.value.id, <updateProduct>{
        ...form.value,
        id: update.value.id,
        status: form.value.status,
      })
    } else {
      await ApiService.createProduct(form.value)
    }
    resetForm()
    await loadProducts()
  } catch (error) {
    console.log(error)
  }
}
const loadProducts = async () => {
  try {
    const response = await ApiService.getAllProducts()
    products.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const loadMeasures = async () => {
  try {
    const response = await ApiService.getAllMeasures()
    measures.value = response.data
  } catch (error) {
    console.log(error)
  }
}


const editMessage = (product: updateProduct) => {
  update.value = {
    status: product.status,
    id: product.id,
    name: product.name,
    description: product.description,
    measureId: product.measureId
  }
  form.value = {
    name: product.name,
    description: product.description,
    measureId: product.measureId
  }

  isEditing.value = true
}


const deleteProduct = async (id: number) => {
  if (confirm("O'chirishga ishonchingiz komilmi?")) {
    await ApiService.deleteProduct(id)
    await loadProducts()
  }
}
const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    measureId: 0,
  };
  update.value = {
    status: "",
    id: 0,
    name: "",
    description: "",
    measureId: 0
  }
  isEditing.value = false
}
onMounted(() => {
  loadMeasures()
  loadProducts()
})

</script>