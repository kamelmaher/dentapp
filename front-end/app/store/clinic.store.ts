import { create } from "zustand/react";
import { clinic } from "~/services/clinic";
import type { Clinic } from "~/types/Clinic";
type clinicState = {
    loading: boolean,
    err: string | null,
    clinics: Clinic[],
    selectedClinic: Clinic
    getClinics: (page?: number) => Promise<void>
    getSingleClinic: (slug: string) => Promise<void>
}
export const useClinicStore = create<clinicState>((set, get) => ({
    loading: false,
    err: null,
    clinics: [],
    selectedClinic: {} as Clinic,
    getClinics: async (page) => {
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
    getSingleClinic: async (slug: string) => {
        const response = await clinic.getSingleClinic(slug)
        set({ selectedClinic: response.data.data })
    }
}))