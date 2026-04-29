import type { Appointment as AppointmentType } from "~/types/Appointment"
import { getAppointmentDate, getAppointmentHour } from "~/utils/appointments"

type AppointmentProps = {
    appointment: AppointmentType
}
const Appointment = ({ appointment }: AppointmentProps) => {
    const appointmentDate = getAppointmentDate(appointment.date)
    const appointmentHour = getAppointmentHour(appointment.date)
    return (
        <div
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
        >
            <div>
                <div>
                    <div className="flex justify-between">

                        <h3 className="font-bold text-gray-900 mb-2">{appointment.patientName}</h3>

                        <p className="bg-blue-500 text-white p-[5px] rounded-2xl text-sm">منتهي - لم يتم التاكيد</p>

                    </div>
                    <div className="flex gap-2 text-gray-500 text-sm">
                        <p> {appointmentHour}</p>
                        <span>-</span>
                        <p>{appointmentDate}</p>
                    </div>
                </div>

                <div className="flex gap-2 items-center">

                    {
                        appointment.status == "pending" ?
                            <>
                                <button className="text-sm text-yellow-600 hover:underline">
                                    تأكيد
                                </button>
                                <button className="text-sm text-red-600 hover:underline">
                                    الغاء
                                </button>
                            </>
                            :
                            appointment.status == "accepted" ?
                                <button className="text-sm text-yellow-600 hover:underline">
                                    تعديل
                                </button>
                                : <p>ملغية</p>

                    }
                    {/* <button className="text-sm text-green-600 hover:underline">
                                            تأكيد
                                        </button>


                                        <button className="text-sm text-red-600 hover:underline">
                                            إلغاء
                                        </button> */}

                </div>
            </div>
            <div>
                {
                    appointment.notes
                }
            </div>
        </div>
    )
}

export default Appointment
