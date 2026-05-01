import { appointmentStatus } from "../../../data/constants"
import { useAppointmentStore } from "../../../store/appointment.store"
import Spinner from "../../Spinner"
type AppointmentOptionsProps = {
    _id: string,
    isExpired: boolean
    status: "accepted" | "declined" | "pending"
}
const AppointmentOptions = ({ _id, isExpired, status }: AppointmentOptionsProps) => {
    const { confirmAppointment, declineAppointment, optionsLoading } = useAppointmentStore()
    return (
        !isExpired &&
        <div className="flex gap-3 items-center">
            {
                optionsLoading ? <Spinner
                    color="bg-blue-500"
                /> :
                    status == appointmentStatus.pending ?
                        <>
                            <button
                                className="text-sm text-yellow-600 hover:underline"
                                onClick={() => confirmAppointment(_id!)}
                            >
                                تأكيد
                            </button>
                            <button
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => declineAppointment(_id!)}
                            >
                                الغاء
                            </button>
                        </>
                        :
                        status == appointmentStatus.accepted ?
                            <p className="text-sm text-green-500">تم التأكيد</p>
                            :
                            <p className="text-sm text-red-500">تم الالغاء</p>
            }
        </div>
    )
}

export default AppointmentOptions
