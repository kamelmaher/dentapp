import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingForm from "~/components/BookForm";
import Spinner from "~/components/Spinner";
import { useClinicStore } from "~/store/clinic.store";
import { formatWorkingHours } from "~/utils/clinics";

export default function ClinicPage() {
    const { slug } = useParams()
    const { getClinicBySlug, selectedClinic, clinicLoading } = useClinicStore()
    useEffect(() => {
        if (!slug) return
        getClinicBySlug(slug)
    }, [slug])

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {
                clinicLoading ?
                    <div className="flex justify-center h-80 items-center">
                        <Spinner color="blue-500" size="lg" />
                    </div>
                    :
                    <>
                        {/* Hero Section */}
                        <div className="bg-gradient-to-l from-blue-600 to-indigo-600 text-white py-16 px-6 text-right">
                            <div className="max-w-5xl mx-auto">
                                <h1 className="text-4xl font-bold">{selectedClinic.clinicName}</h1>

                                <p className="mt-3 text-lg text-blue-100">
                                    رعاية أسنان حديثة باستخدام أحدث التقنيات الطبية وخبرة عالية في العلاج.
                                </p>

                                <div className="mt-6 flex gap-4 justify-end">
                                    <button
                                        // onClick={handleBooking}
                                        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                                    >
                                        حجز موعد
                                    </button>

                                    <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition">
                                        تواصل معنا
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

                            {/* About */}
                            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm text-right">
                                <h2 className="text-xl font-semibold mb-3">عن العيادة</h2>

                                <p className="text-gray-600 leading-relaxed">{selectedClinic.description}</p>
                            </div>

                            {/* Info */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 text-right">
                                <h2 className="text-xl font-semibold">معلومات العيادة</h2>

                                {
                                    selectedClinic.address &&
                                    <div>
                                        <p className="text-gray-500 text-sm">العنوان</p>
                                        <p className="font-medium">{selectedClinic.address}</p>
                                    </div>
                                }
                                {
                                    selectedClinic.phoneNumber &&
                                    <div>
                                        <p className="text-gray-500 text-sm">رقم الهاتف</p>
                                        <p className="font-medium">{selectedClinic.phoneNumber}</p>
                                    </div>
                                }
                                {
                                    selectedClinic.email &&
                                    <div>
                                        <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                                        <p className="font-medium">{selectedClinic.email}</p>
                                    </div>
                                }
                                <div>
                                    <p className="text-gray-500 text-sm">أوقات العمل</p>
                                    <p className="font-medium">{formatWorkingHours(selectedClinic.workingHours!)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Section */}
                        <div className="max-w-5xl mx-auto px-6 pb-16">
                            <div className="bg-white p-8 rounded-2xl shadow-md text-center">

                                <h2 className="text-2xl font-bold mb-2">
                                    احجز موعدك الآن
                                </h2>

                                <p className="text-gray-500 mb-6">
                                    اختر الوقت المناسب لك وسيتم تأكيد الحجز من قبل العيادة
                                </p>

                                <BookingForm />
                            </div>
                        </div>
                    </>

            }
        </div>
    );
}