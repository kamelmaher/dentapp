import { create } from "zustand";
import { appointment } from "~/services/appointment";
import { user } from "~/services/user";
import type { Appointment } from "~/types/Appointment";
type appointmentState = {
    appointments: Appointment[]
    createAppointment: (data: Appointment) => Promise<void>
    loading: boolean,
    err: string | null
    todayAppointments: Appointment[],
    upComingAppointments: Appointment[],
    expiredAppointments: Appointment[]
    page: number,
    setPage: (page: number) => void,
    loadAppointments: (page: number) => Promise<void>,
    getTodayAppointments: () => Promise<void>
    getUpcomingAppointments: () => Promise<void>
    getExpiredAppointments: (page: number) => Promise<void>
}
export const useAppointmentStore = create<appointmentState>((set, get) => ({
    loading: false,
    err: null,
    appointments: [],
    todayAppointments: [],
    upComingAppointments: [],
    expiredAppointments: [],
    page: 1,
    setPage: (page) => set({ page }),
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
    },
    loadAppointments: async (page) => {
        try {
            set({ loading: true })
            const res = await appointment.loadAppointments(page)
            if (res.data.status == "success")
                set({ appointments: res.data.data })
            else set({ err: res.data.data })
        } catch (err) {
            set({ err: "Something went Wrong" })
        } finally {
            set({ loading: false })
        }
    },
    getTodayAppointments: async () => {
        const res = await appointment.getTodayAppointments()
        if (res.data.status === "success")
            set({ todayAppointments: res.data.data })
        else set({ err: res.data.data })
    },
    getUpcomingAppointments: async () => {
        const res = await appointment.getUpComingAppointments()
        if (res.data.status === "success")
            set({ upComingAppointments: res.data.data })
        else set({ err: res.data.data })
    },
    getExpiredAppointments: async (page) => {
        try {
            set({ loading: true })
            const res = await appointment.getExpiredAppointments(page)
            if (res.data.status == "success")
                set({ expiredAppointments: res.data.data })
            else set({ err: res.data.data })
        } catch (err) {
            set({ err: "Something went Wrong" })
        } finally {
            set({ loading: false })
        }
    }
}));