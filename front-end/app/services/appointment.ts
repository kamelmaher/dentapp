import { get, post } from "~/config/api";
import type { Appointment } from "~/types/Appointment";

export const appointment = {
    create: (data: Appointment) => post("/appointment", data),
    // getById: (id: string) => get(`/appointment/${id}`),
    loadAppointments: (page: number) => get(`/appointment?page=${page || 1}`),
    getTodayAppointments: () => get(`/appointment/today`),
    getUpComingAppointments: () => get(`/appointment/upcoming`),
};
