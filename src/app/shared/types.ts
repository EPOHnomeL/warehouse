export interface User {
    username: string;
    email?: string;
    newUsername?: string;
    newEmail?: string;
    password?: string;
    role?: string;
    token?: string;
    isLogin?: boolean;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    values: any;
}

export enum ProductCategories{
    Food,
    Clothes,
    Medicine,
    Household
}

export interface Product {
    name: string;
    category: ProductCategories;
    quantity: number;
 }
  