import React from 'react'
import type { Appointment } from '~/types/Appointment'
import { getAppointmentDate, getAppointmentHour } from '~/utils/appointments'
type AppointmentsListProps = {
    list: Appointment[]
    title: string
}
const AppointmentsList = ({ list, title }: AppointmentsListProps) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-5">
                مواعيد {title}
            </h3>
            {
                list.length > 0 ?
                    <ul className="space-y-4">
                        {
                            list.map(e => {
                                return <li
                                    className="flex justify-between items-center p-3 bg-blue-50 rounded-xl"
                                    key={e._id}
                                >
                                    <p className="text-gray-700">{getAppointmentHour(e.date)} - {e.patientName}</p>
                                    {
                                        title == "قادمة" ?
                                            <span className='text-sm bg-blue-600 text-white px-3 py-1 rounded-full'>
                                                {getAppointmentDate(e.date)}
                                            </span>
                                            :
                                            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                                                محجوز
                                            </span>
                                    }
                                </li>
                            })
                        }

                    </ul>
                    :
                    <h3>
                        لا يوجد مواعيد {title}
                    </h3>
            }

        </div>
    )
}

export default AppointmentsList
