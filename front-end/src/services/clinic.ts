import { get, patch } from "../config/api";
import type { Clinic } from "../types/Clinic";
const baseUrl = "/clinic"
export const clinic = {
    // general clinics
    getClinics: (page?: number) => get(`${baseUrl}?page=${page || 1}`),
    getClinicBySlug: (slug: string) => get(`${baseUrl}/slug/${slug}`),

    // user clinic
    getUserClinic: () => get(`${baseUrl}/dashboard`),
    updateClinic: (data: Partial<Clinic>) => patch(`${baseUrl}/update`, data)
}