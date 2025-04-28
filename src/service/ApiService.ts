import type {
    createIncome,
    createMeasure,
    createOrder,
    createProduct,
    updateIncome, updateOrder,
    updateProduct
} from "../models/Product.ts";
import axiosInstance from "../axios.ts";

export const ApiService = {
    async createProduct(product: createProduct) {
        return await axiosInstance.post("/api/product/create", product);
    },
    async updateProduct(id: number, product: updateProduct) {
        return await axiosInstance.put(`/api/product/update/${id}`, product);
    },
    async createMeasure(user: createMeasure) {
        const response = await axiosInstance.post("/api/measure/create", user);
        return response.data;
    },
    async createIncome(income: createIncome) {
        const response = await axiosInstance.post("/api/income/create", income);
        return response.data;
    },
    async updateIncome(id: number, income: updateIncome) {
        return await axiosInstance.put(`/api/income/update/${id}`, income);
    },
    async createOrder(order: createOrder) {
        return await axiosInstance.post("/api/order/create", order);
    },
    async updateOrder(id: number, order: updateOrder) {
        return await axiosInstance.put(`/api/order/update/${id}`, order);
    },
    async getAllOrders() {
        return await axiosInstance.get("/api/order/all");
    },
    async getAllIncomes() {
        return await axiosInstance.get("/api/income/all");
    },
    async getAllMeasures() {
        return axiosInstance.get("/api/measure/all")
    },
    async getAllProducts() {
        return axiosInstance.get("/api/product/active");
    },
    async getAllWarehouses() {
        return axiosInstance.get("/api/warehouse/all");
    },
    async updateMeasure(id: number, data: createMeasure) {
        return await axiosInstance.put(`api/measure/update/${id}`, data);
    },
    async deleteMeasure(id: number) {
        return await axiosInstance.delete(`api/measure/delete/${id}`);
    },
    async deleteProduct(id: number) {
        return await axiosInstance.delete(`api/product/delete/${id}`);
    },
    async deleteIncome(id: number) {
        return await axiosInstance.delete(`/api/income/delete/${id}`);
    },
    async deleteOrder(id: number) {
        return await axiosInstance.delete(`/api/order/delete/${id}`);
    },
    async activeIncome() {
        return await axiosInstance.get("/api/income/allActive");
    },
    async activeOrder() {
        return await axiosInstance.get("/api/order/allActive");
    }
}