import type {LoginUser, RegisterUser} from "../models/Product.ts";
import axiosInstance from "../axios.ts";

export const AuthService = {
    async signUp(user: RegisterUser) {
        const response = await axiosInstance.post("/auth/signup", user);
        return response.data;
    },
    async login(user: LoginUser) {
        const response = await axiosInstance.post("/auth/login", user);
        return response.data;
    },
}