import { useEffect, useState } from "react";
import { useAppointmentStore } from "../store/appointment.store";
import type { WorkingHours } from "../types/Clinic";

type Props = {
    workingHours: WorkingHours;
    onSelect: (dateTime: string) => void;
};

export default function TimeSelector({ workingHours, onSelect }: Props) {
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [booked, setBooked] = useState<number[]>([])
    const { getBooked } = useAppointmentStore()

    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    const generateSlots = (start: string, end: string) => {
        const startH = parseInt(start.split(":")[0]);
        const endH = parseInt(end.split(":")[0]);

        const arr = [];
        for (let i = startH; i < endH; i++) arr.push(i);
        return arr;
    };

    // fetch booked hours 
    useEffect(() => {
        if (!date) return
        const fetchBooked = async () => {
            const bookedData = await getBooked(date)
            setBooked(bookedData)
        }
        fetchBooked()
    }, [date, getBooked])

    useEffect(() => {
        if (!date) return;

        const day = new Date(date + "T00:00:00").getDay();
        const workingDay = workingHours.find((d) => d.day === day);

        if (!workingDay || !workingDay.isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSlots([]);
            return;
        }

        setSlots(generateSlots(workingDay.start, workingDay.end));
        setSelected(null);
    }, [date, workingHours]);

    useEffect(() => {
        if (!date || selected === null) return;

        const hour = selected.toString().padStart(2, "0");
        const dateTime = `${date}T${hour}:00:00`;

        onSelect(dateTime);
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
            {slots.length > 0 && (
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