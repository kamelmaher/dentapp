import { useEffect, useState } from "react";
import { dateFormatter, formatHour } from "~/utils";

type TimeSelectorProps = {
    selectDate: (date: string) => void
}

export default function TimeSelector({ selectDate }: TimeSelectorProps) {
    const [date, setDate] = useState("")
    const [hour, setHour] = useState(0)
    const [slots, setSlots] = useState([11, 12, 13, 14]);
    useEffect(() => {
        if (date && hour) selectDate(dateFormatter(date, hour))
    }, [date, hour])
    return (
        <div className="space-y-5 rounded-2xl border border-gray-200 p-5 bg-white shadow-sm" >

            {/* Date Picker */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Select Date
                </label>

                <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={e => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Time Section */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                    Available Times
                </label>

                {/* No date */}
                {!date && (
                    <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                        Please choose a date first
                    </div>
                )}


                {
                    date &&
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {slots.map(e => formatHour(e)).map((slot) => (
                            <button
                                type="button"
                                key={slot}
                                onClick={() => setHour(slot)}
                                className={`rounded-lg px-3 py-2 text-xs font-medium border transition-all duration-200
                                ${hour === slot
                                        ? "bg-black text-white border-black scale-105 shadow-sm"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                }

                {date && slots.length === 0 && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        No available appointments for this date
                    </div>
                )}
            </div>

            {/* Summary */}
            {
                date && hour && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        تم الحجز في:
                        <span className="font-semibold">
                            {" "} {date} الساعة {hour}
                        </span>
                    </div>
                )
            }
        </div>
    )
}