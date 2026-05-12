import { post } from "../config/api";

const baseUrl = "/sms"
export const sms = {
    pickAppointment: (data: { clinicId: string, date: string, patientName: string }) => post(`${baseUrl}/pick-sms`, data),

    confirmAppointment: (data: { clinicId: string, date: string, patientName: string, patientPhoneNumber: string, status: "accepted" | "declined" }) => post(`${baseUrl}/confirm-sms`, data),
}