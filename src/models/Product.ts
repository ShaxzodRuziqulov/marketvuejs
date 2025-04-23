export interface createProduct {
    id: number;
    name: string;
    description: string;
    measureId: number;
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
export interface Measure {
    id: number;
    name: string;
    piece?: string;
    liter?: string;
    kilogram?: number;
}
