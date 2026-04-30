import React, { useEffect, useState } from "react";
import TimeSelector from "./TimeSelector";
import type { BookingAppointment } from "~/types/authTypes";
import { useParams } from "react-router";
import { useAppointmentStore } from "~/store/appointment.store";
import { useClinicStore } from "~/store/clinic.store";
import { appointmentSchema } from "~/data/Schemas";
import { useFormState } from "react-dom";
import type { Appointment } from "~/types/Appointment";

export default function BookingForm() {
    const { slug } = useParams()
    const { createAppointment, loading, err, } = useAppointmentStore()
    const { getClinicBySlug, selectedClinic } = useClinicStore()
    const [open, setOpen] = useState(false);
    const [formErr, setFormErr] = useState("")
    const [formData, setFormData] = useState({
        patientName: "",
        patientAddress: "",
        patientEmail: "",
        date: "",
        patientPhoneNumber: "",
        notes: "",
    } as Appointment);

    useEffect(() => {
        const loadClinic = async () => {
            if (!slug) return
            await getClinicBySlug(slug)
        }
        loadClinic()
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        setFormErr("")
        e.preventDefault();
        if (!slug) return
        if (!selectedClinic._id) return
        const result = appointmentSchema.safeParse(formData)
        if (result.success) {
            await createAppointment({ ...formData, clinicId: selectedClinic._id })
            if (!err) setOpen(false)
        } else {
            setFormErr("الرجاء تأكد من صحة المعلومات")
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const selectDate = (date: string) => setFormData({ ...formData, date: date })

    return (
        <>
            {/* زر الحجز */}
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
            >
                حجز موعد
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    dir="rtl"
                >
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">

                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4">
                            <h2 className="text-lg font-bold">حجز موعد جديد</h2>
                            <p className="text-sm text-blue-100">
                                الرجاء تعبئة البيانات التالية
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">

                            <input
                                name="patientName"
                                placeholder="الاسم الكامل"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <input
                                name="patientAddress"
                                placeholder="العنوان"
                                value={formData.patientAddress}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <input
                                name="patientPhoneNumber"
                                placeholder="رقم الجوال"
                                value={formData.patientPhoneNumber}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            {/* Date & Time Selector */}
                            <TimeSelector onSelect={selectDate} workingHours={selectedClinic.workingHours!} />


                            <textarea
                                name="notes"
                                placeholder="ملاحظات (اختياري)"
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
                            />
                            {
                                err &&
                                <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl py-2 mt-3 text-sm font-medium">
                                    {err}
                                </p>
                            }
                            {
                                formErr &&
                                <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl py-2 mt-3 text-sm font-medium">
                                    {formErr}
                                </p>
                            }
                            {/* Actions */}
                            <div className="flex justify-between items-center pt-2">

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="text-gray-600 hover:text-black"
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {loading ? "جاري الإرسال..." : "تأكيد الحجز"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}