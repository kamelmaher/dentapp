export type Appointment = {
    _id?: string,
    clinicId: string,
    status: "accepted" | "pending" | "declined"
    date: string
    patientName: string,
    patientPhoneNumber: string,
    patientEmail?: string,
    patientAddress: string
    notes?: string
}
