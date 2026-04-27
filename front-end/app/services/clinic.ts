import { get } from "../config/api";

export const clinic = {
    getSingleClinic: (slug: string) => get(`/clinic/${slug}`),
    getClinics: (page?: number) => get(`/clinic?page=${page || 1}`)
}