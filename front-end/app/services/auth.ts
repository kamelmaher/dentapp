import type { registerType } from "~/types/authTypes";
import { get, post } from "../config/api";

export const auth = {
    register: (data: registerType) => post("/user/register", data),
    login: (data: { email: string, password: string }) => post("/user/login", data),
    me: () => get("/user/me"),
    logout: () => post("/user/logout")
};
