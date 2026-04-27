import { get, post } from "~/config/api";
import type { Appointment } from "~/types/Appointment";
import type { BookingAppointment } from "~/types/authTypes";

export const appointment = {
    create: (data: Appointment) => post("/appointment", data),
    load: () => get("/appointment"),
    getById: (id: string) => get(`/appointment/${id}`),
};
