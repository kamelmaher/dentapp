import { get } from "../config/api";

export const clinic = {
    // general clinics
    getClinics: (page?: number) => get(`/clinic?page=${page || 1}`),
    getClinicBySlug: (slug: string) => get(`/clinic/slug/${slug}`),

    // user clinic
    getClinicDetails: () => get(`/clinic/dashboard`)
}