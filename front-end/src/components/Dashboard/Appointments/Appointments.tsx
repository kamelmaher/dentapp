import Spinner from "../../Spinner";
import Appointment from "./Appointment";
import { useEffect } from "react";
import AppointmentsFilter from "./AppointmentsFilter";
import { useAppointmentStore } from "../../../store/appointment.store";
import Pagination from "../../Paginiation";

export default function Appointments() {
    const { loadAppointments, appointments, loading, setPage, page, totalPages, } = useAppointmentStore()

    useEffect(() => {
        loadAppointments({ page })
    }, [loadAppointments, page])

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">المواعيد</h2>
                <p className="text-gray-500">إدارة جميع مواعيد العيادة</p>
            </div>

            <AppointmentsFilter />
            {
                loading ? <Spinner /> :
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {
                                appointments.length > 0 ? (
                                    appointments.map((appointment) => (
                                        <Appointment
                                            key={appointment._id}
                                            appointment={appointment}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500">لا يوجد مواعيد</p>
                                )}
                        </div>

                        {
                            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                        }
                    </>
            }

        </div >
    );
}