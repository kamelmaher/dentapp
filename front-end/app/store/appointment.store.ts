import { create } from "zustand";
import { appointment } from "~/services/appointment";
import type { Appointment } from "~/types/Appointment";
type appointmentState = {
    appointments: Appointment[]
    createAppointment: (data: Appointment) => Promise<void>
    loading: boolean,
    err: string | null
}
export const useAppointmentStore = create<appointmentState>((set, get) => ({
    loading: false,
    err: null,
    appointments: [],
    createAppointment: async (data) => {
        set({ loading: true, err: null })
        try {
            const response = await appointment.create(data)
            if (response.data.status === "success")
                set({ appointments: [...get().appointments, response.data.data] })
            else set({ err: "error while creating appointment" })
        } catch (err) {
            set({ err: "something went wrong" })
        } finally {
            set({ loading: false })
        }
    }
}));