import type {createMeasure, createProduct, updateProduct} from "../models/Product.ts";
import axiosInstance from "../axios.ts";

export const ApiService = {
    async createProduct(product: createProduct) {
        return await axiosInstance.post("/api/product/create", product);
    },
    async updateProduct(id: number, product: updateProduct) {
        return await axiosInstance.put(`/api/product/update/${id}`, product);
    },
    async createMeasure(user: createMeasure) {
        const response = await axiosInstance.post("api/measure/create", user);
        return response.data;
    },
    async getAllMeasures() {
        return axiosInstance.get("/api/measure/all")
    },
    async getAllProducts() {
        return axiosInstance.get("/api/product/active");
    },
    async updateMeasure(id: number, data: createMeasure) {
        return await axiosInstance.put(`api/measure/update/${id}`, data);
    },
    async deleteMeasure(id: number) {
        return await axiosInstance.delete(`api/measure/delete/${id}`);
    },

    async deleteProduct(id: number) {
        return await axiosInstance.delete(`api/product/delete/${id}`);
    }
}