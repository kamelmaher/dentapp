import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Spinner from "../components/Spinner";
import { useClinicStore } from "../store/clinic.store";

export default function ClinicsPage() {
    const { clinics, loadClinics, loading } = useClinicStore()
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadClinics(page)
    }, [loadClinics, page])
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        العيادات المسجلة لدينا
                    </h1>
                    <p className="text-gray-500 mt-2">
                        تصفح جميع العيادات المشتركة في منصة DentApp
                    </p>
                </div>

                {/* Clinics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        loading ?
                            <div className="col-span-12 flex justify-center items-center min-h-80 ">
                                <Spinner size="lg" color="blue-500" />
                            </div>
                            :
                            <>
                                {
                                    clinics.map((clinic) => (
                                        <div
                                            key={clinic._id}
                                            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
                                        >
                                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                                {clinic.clinicName}
                                            </h2>

                                            <p className="text-gray-500 text-sm leading-7 mb-5">
                                                {clinic.description}
                                            </p>

                                            <NavLink
                                                to={`/clinic/${clinic.slug}`}
                                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                                            >
                                                زيارة الصفحة
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </>

                    }

                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10 gap-2 flex-wrap">

                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
                    >
                        السابق
                    </button>

                    {Array.from({ length: 5 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded-xl border transition ${page === i + 1
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, 3))
                        }
                        className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
                    >
                        التالي
                    </button>

                </div>

            </div>
        </div>
    );
}