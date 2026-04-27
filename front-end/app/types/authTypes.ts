export type registerType = {
    userName: string,
    email: string,
    password: string,
    clinicName: string,
    phoneNumber: string,
    description: string;
}

export type BookingAppointment = {
    date: string
    patientName: string,
    patientPhoneNumber: string,
    patientEmail: string,
    patientAddress: string
    notes?: string,
    slug: string,
    clinicId: string
}