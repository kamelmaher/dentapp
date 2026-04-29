import { create } from "zustand";
import type { Clinic } from "~/types/Clinic";
import { user } from "~/services/user"
import type { Appointment } from "~/types/Appointment";
type UserState = {
    loading: boolean,
    err: string | null
}
export const userStore = create<UserState>(set => ({
    loading: false,
    err: null,
}))