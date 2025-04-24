
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