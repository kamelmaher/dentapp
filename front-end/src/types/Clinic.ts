import { plans } from "../data/constants"

export type Clinic = {
    _id: string,
    userId: string,
    clinicName: string,
    description: string,
    phoneNumber?: string,
    email?: string,
    address?: string
    slug: string
    logo?: string
    createdAt: string
    validTo: string
    workingHours?: WorkingHours[]
    plan: typeof plans[keyof typeof plans]
}
export type WorkingHours = {
    day: number,
    isOpen: boolean,
    start: string,
    end: string
}