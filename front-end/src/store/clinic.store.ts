import { create } from "zustand/react";
import { clinic } from "../services/clinic";
import type { Clinic } from "../types/Clinic";
import { showError, showSuccess } from "../utils/toast";
type clinicState = {
    loading: boolean,
    page: number,
    totalPages: number,
    setPage: (page: number) => void,
    updateLoading: boolean,
    clinicLoading: boolean,
    err: string | null,
    clinics: Clinic[],
    selectedClinic: Clinic
    loadClinics: (page?: number) => Promise<void>
    getClinicBySlug: (slug: string) => Promise<void>
    getUserClinic: () => Promise<void>
    updateClinic: (data: Partial<Clinic>) => Promise<void>
    subscribe: (clinicId: string, plan: string) => Promise<void>
}
export const useClinicStore = create<clinicState>((set, get) => ({
    loading: false,
    page: 1,
    totalPages: 0,
    setPage: (page) => set({ page }),
    updateLoading: false,
    clinicLoading: false,
    err: null,
    clinics: [],
    selectedClinic: {} as Clinic,

    loadClinics: async (page) => {
        set({ loading: true })
        try {
            const response = await clinic.getClinics(page || 1)
            if (response.data.status === "success") {
                set({
                    clinics: response.data.data,
                    totalPages: response.data.pages
                })
            } else showError(response.data.data)
        } catch (err) {
            showError()
        } finally {
            set({ loading: false })
        }
    },

    getClinicBySlug: async (slug) => {
        try {
            set({ clinicLoading: true })
            if (get().selectedClinic?.slug === slug) return;
            const response = await clinic.getClinicBySlug(slug)
            if (response.data.status == "success") {
                set({ selectedClinic: response.data.data })
            }
            else showError(response.data.data)
        } catch (err) {
            showError()
        } finally {
            set({ clinicLoading: false })
        }
    },

    getUserClinic: async () => {
        set({ loading: true })
        try {
            const res = await clinic.getUserClinic()
            if (res.data.status === "success") set({ selectedClinic: res.data.data })
            else set({ err: res.data.data })
        } catch (err) {
            set({ err: "Something went wrong" })
        } finally {
            set({ loading: false })
        }
    },

    updateClinic: async (data) => {
        set({ updateLoading: true })
        try {
            const res = await clinic.updateClinic(data)
            if (res.data.status === "success") {
                set({ selectedClinic: res.data.data })
                showSuccess()
            }
            else {
                showError(res.data.data)
            }
        } catch (err) {
            showError()
        } finally {
            set({ updateLoading: false })
        }
    },

    subscribe: async (clinicId, plan) => {
        try {
            const res = await clinic.subscribe(clinicId, plan)
            if (res.data.status === "success") {
                set((state) => ({
                    clinics: state.clinics.map((clinic) =>
                        clinic._id === clinicId
                            ? { ...clinic, plan, validTo: res.data.data.validTo }
                            : clinic
                    ),
                }))
                showSuccess()
            }
        } catch (err) {
            showError()
        }
    }
}))