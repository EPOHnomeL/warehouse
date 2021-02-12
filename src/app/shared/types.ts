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
  