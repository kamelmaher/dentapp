import { get, patch, post } from "../config/api";
import type { registerType } from "../types/authTypes";
import type { User } from "../types/User";

const baseUrl = "/user"
export const auth = {
    register: (data: registerType) => post(`${baseUrl}/register`, data),
    login: (data: { email: string, password: string }) => post(`${baseUrl}/login`, data),
    me: () => get(`${baseUrl}/me`),
    logout: () => post(`${baseUrl}/logout`),
    updateUser: (data: Partial<User>) => patch(`${baseUrl}`, data)
};
