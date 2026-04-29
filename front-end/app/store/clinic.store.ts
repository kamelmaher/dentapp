import { create } from "zustand/react";
import { clinic } from "~/services/clinic";
import { user } from "~/services/user";
import type { Clinic } from "~/types/Clinic";
type clinicState = {
    loading: boolean,
    err: string | null,
    clinics: Clinic[],
    selectedClinic: Clinic
    loadClinics: (page?: number) => Promise<void>
    getClinicBySlug: (slug: string) => Promise<void>
    getClinicDetails: () => Promise<void>
}
export const useClinicStore = create<clinicState>((set, get) => ({
    loading: false,
    err: null,
    clinics: [],
    selectedClinic: {} as Clinic,
    loadClinics: async (page) => {
        set({ loading: true })
        try {
            const response = await clinic.getClinics(page || 1)
            if (response.data.status === "success") {
                set({
                    clinics: response.data.data
                })
            } else set({ err: response.data.data })
        } catch (err) {
            set({ err: "something went wrong" })
        } finally {
            set({ loading: false })
        }
    },
    getClinicBySlug: async (slug) => {
        const response = await clinic.getClinicBySlug(slug)
        set({ selectedClinic: response.data.data })
    },
    getClinicDetails: async () => {
        set({ loading: true })
        try {
            const res = await clinic.getClinicDetails()
            if (res.data.status === "success") set({ selectedClinic: res.data.data })
            else set({ err: res.data.data })
        } catch (err) {
            set({ err: "Something went wrong" })
        } finally {
            set({ loading: false })
        }
    },
}))