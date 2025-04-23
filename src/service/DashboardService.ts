import axios from "../axios.ts";

export const DashboardService = {
    getProductCount: () => axios.get('/api/product/count'),
    getOrderCount: () => axios.get('/api/order/count'),
    getIncomeCount: () => axios.get('/api/income/count'),
    getLatestIncomes: () => axios.get('/api/income/latest'),
    getChartData: () => axios.get('/api/product/chart'),
}
