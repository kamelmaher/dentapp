/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAppointmentStore } from "../store/appointment.store";
import type { WorkingHours } from "../types/Clinic";
import Spinner from "./Spinner";
import { getAvailableHours, getMinDate } from "../utils/appointments";

type Props = {
    workingHours: WorkingHours[];
    onSelect: (dateTime: string) => void;
};

export default function TimeSelector({ workingHours, onSelect }: Props) {
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [booked, setBooked] = useState<number[]>([])
    const [bookedLoading, setBookedLoading] = useState(false)
    const { getBooked } = useAppointmentStore()

    useEffect(() => {
        if (!date) return;

        const selectedDate = new Date(date);
        const day = selectedDate.getDay();

        const workingDay = workingHours.find((d) => d.day === day);

        if (!workingDay || !workingDay.isOpen) {
            setBooked([]);
            return;
        }

        const fetchBooked = async () => {
            setBookedLoading(true);

            const isoDate = new Date(date).toISOString().split("T")[0];

            const bookedData = await getBooked(isoDate);

            setBooked(bookedData);
            setBookedLoading(false);
        };

        fetchBooked();
    }, [date, getBooked, workingHours]);

    useEffect(() => {
        if (!date) return;
        setSlots(getAvailableHours(workingHours, date))
        setSelected(null)
    }, [date, workingHours]);

    useEffect(() => {
        if (!date || selected === null) return;

        const selectedDate = new Date(date);
        selectedDate.setHours(selected, 0, 0, 0);

        onSelect(selectedDate.toISOString());
    }, [date, onSelect, selected]);

    return (
        <div className="space-y-4">

            <div>
                <label>التاريخ</label>
                <input
                    type="date"
                    min={getMinDate()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />
            </div>

            {/* ⏰ TIME */}
            {bookedLoading ? <Spinner /> :
                slots.length > 0 && (
                    <div>
                        <p>اختر الوقت</p>
                        <div className="grid grid-cols-4 gap-2">
                            {slots.map((h) => {
                                const isBooked = booked.includes(h);

                                return (
                                    <button
                                        type="button"
                                        key={h}
                                        disabled={isBooked}
                                        onClick={() => setSelected(h)}
                                        className={`p-2 rounded border
                  ${isBooked
                                                ? "bg-gray-200 cursor-not-allowed"
                                                : selected === h
                                                    ? "bg-blue-600 text-white"
                                                    : "hover:bg-blue-50"
                                            }`}
                                    >
                                        {h >= 12 ? `${h - 12 || 12} PM` : `${h} AM`}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

            {/* ❌ لا يوجد مواعيد */}
            {date && slots.length === 0 && (
                <p className="text-red-500">هذا اليوم غير متاح</p>
            )}

        </div >
    );
}