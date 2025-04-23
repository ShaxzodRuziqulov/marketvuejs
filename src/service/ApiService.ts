import type {createProduct} from "../models/Product.ts";
import axiosInstance from "../axios.ts";

export const ApiService = {
    async createProduct(user: createProduct) {
        const response = await axiosInstance.post("/product/create", user);
        return response.data;
    },
    async getMeasures() {
        return axiosInstance.get("/api/measure/all")
    }
}