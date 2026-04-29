import { useAppointmentStore } from "~/store/appointment.store";
import Spinner from "../Spinner";
import Appointment from "./Appointment";
import { useEffect, useMemo, useState } from "react";
import { AppointmentFilter } from "~/data/AppointmentsFilter";
import type { Appointment as AppointmentType } from "~/types/Appointment";

export default function Appointments() {
    const { appointments, loading, setPage, upComingAppointments, todayAppointments, expiredAppointments } = useAppointmentStore()
    const [selectedType, setSelectedType] = useState("")

    const filteredAppointments = useMemo(() => {
        switch (selectedType) {
            case "today":
                return todayAppointments
            case "upcoming":
                return upComingAppointments
            case "expired":
                return expiredAppointments
            default:
                return appointments
        }
    }, [selectedType, appointments, todayAppointments, upComingAppointments, expiredAppointments])

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">المواعيد</h2>
                <p className="text-gray-500">إدارة جميع مواعيد العيادة</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">

                <select
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition outline-none"
                    defaultValue=""
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {
                        AppointmentFilter.map(e =>
                            <option
                                key={e.text}
                                value={e.value}
                            >
                                {e.text}
                            </option>)
                    }
                </select>

                <input
                    placeholder="بحث عن مريض..."
                    className="ml-auto bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition outline-none"
                />

            </div>

            {/* Appointments List */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {
                    loading ?
                        <Spinner color="blue-500" />
                        :
                        filteredAppointments.length > 0 ?
                            filteredAppointments.map(appointment => {

                                return <Appointment key={appointment._id} appointment={appointment} />
                            }) : <p>لا يوجد مواعيد</p>

                }

            </div>

        </div>
    );
}