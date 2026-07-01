/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { appointment } from "../services/appointment";
import type { Appointment } from "../types/Appointment";
import { showError, showSuccess } from "../utils/toast";
import { sms } from "../services/sms";

type appointmentState = {
    appointments: Appointment[]
    loading: boolean,
    optionsLoading: boolean,
    err: string | null
    todayAppointments: Appointment[],
    upComingAppointments: Appointment[],
    expiredAppointments: Appointment[],
    page: number,
    totalPages: number,
    setPage: (page: number) => void,
    createAppointment: (data: Appointment) => Promise<void>
    loadAppointments: ({ dateRange, page, status }: { page?: number, dateRange?: string, status?: string }) => Promise<void>,
    confirmAppointment: (id: string) => Promise<void>
    declineAppointment: (id: string) => Promise<void>
    getBooked: (date: string) => Promise<string[]>,
}

export const useAppointmentStore = create<appointmentState>((set, get) => ({
    loading: false,
    optionsLoading: false,
    err: null,
    appointments: [],
    todayAppointments: [],
    upComingAppointments: [],
    expiredAppointments: [],
    searchResults: [],
    page: 1,
    totalPages: 0,
    setPage: (page) => set({ page }),
    createAppointment: async (data) => {
        set({ loading: true, err: null })
        try {
            const response = await appointment.create(data)
            if (response.data.status === "success") {
                set({ appointments: [...get().appointments, response.data.data] })
                showSuccess("تم انشاء الموعد بنجاح")
                sms.pickAppointment({ clinicId: data.clinicId, date: data.date, patientName: data.patientName })
            }
            else {
                set({ err: "فشل انشاء الموعد" })
                showError(response.data.data)
            }
        } catch (err) {
            set({ err: "something went wrong" })
            showError("حدث خطا ما")
        } finally {
            set({ loading: false })
        }
    },
    loadAppointments: async ({ dateRange, page, status }) => {
        try {
            set({ loading: true })
            const res = await appointment.loadAppointments({ dateRange, page, status })
            if (res.data.status == "success")
                set({ appointments: res.data.data, totalPages: res.data.pages })
        } catch (err: any) {
            set({ err: err.response.data.data })
        } finally {
            set({ loading: false })
        }
    },
    confirmAppointment: async (id) => {
        if (!id) return
        set({ optionsLoading: true })
        try {
            const res = await appointment.confirm(id)
            if (res.data.status === "success") {

                set((state) => ({
                    appointments: state.appointments.map((appt) =>
                        appt._id === id
                            ? { ...appt, status: "accepted" }
                            : appt
                    ),
                }));

                showSuccess("تم التاكيد بنجاح")
                const appointment = get().appointments.find(e => e._id == id)!
                if (!appointment) return
                sms.confirmAppointment({ clinicId: appointment.clinicId, patientName: appointment.patientName, date: appointment.date, status: "accepted", patientPhoneNumber: appointment.patientPhoneNumber })
            }
            else {
                showError(res.data.data)
            }
        } catch (err) {
            showError("فشل التأكيد! يرجى المحاولة لاحقا.")
        } finally {
            set({ optionsLoading: false })
        }
    },
    declineAppointment: async (id) => {
        if (!id) return
        set({ optionsLoading: true })
        try {
            const res = await appointment.decline(id)
            if (res.data.status === "success") {
                set((state) => ({
                    appointments: state.appointments.map((appt) =>
                        appt._id === id
                            ? { ...appt, status: "declined" }
                            : appt
                    ),
                }));
                showSuccess("تم الالغاء بنجاح")
                const appointment = get().appointments.find(e => e._id == id)!
                if (!appointment) return
                sms.confirmAppointment({ clinicId: appointment.clinicId, patientName: appointment.patientName, date: appointment.date, status: "declined", patientPhoneNumber: appointment.patientPhoneNumber })
            }
            else showError(res.data.data)
        } catch (err) {
            showError("فشل الالغاء! حاول مرة أخرى لاحقا ")
        } finally {
            set({ optionsLoading: false })
        }
    },
    getBooked: async (date: string) => {
        const res = await appointment.getBooked(date)
        if (res.data.status === "success")
            return res.data.data
        else return []
    }
}));
