export interface Income {
    id: number;
    productsId: number;
    wareHouseId: number;
    quantity: number;
    measureId: number;
    price: number;
}

export interface WareHouse {
    id: number;
    productsId: number;
    quantity: number;
    measureId: number;
}

export interface Measures {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    measureId: number;
}

export interface Orders {
    id: number;
    productsId: number;
    wareHouseId: number;
    quantity: number;
    measureId: number;
}

export interface updateOrder extends createOrder {
    id: number;
}

export interface createOrder {
    productsId: number;
    wareHouseId: number;
    quantity: number;
    measureId: number;
}

export interface createProduct {
    name: string;
    description: string;
    measureId: number;
    status?: string;
}

export interface RegisterUser {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface createMeasure {
    name: string;
}

export interface updateMeasure extends createMeasure {
    id: number;
}

export interface updateProduct extends createProduct {
    id: number
    status?: string;
}

export interface updateIncome extends createIncome {
    id: number
}


export interface createIncome {
    productsId: number;
    wareHouseId: number;
    quantity: number;
    measureId: number;
    price: number;
}
