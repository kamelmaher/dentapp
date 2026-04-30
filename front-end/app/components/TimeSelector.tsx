import { useEffect, useState } from "react";
import { useAppointmentStore } from "~/store/appointment.store";
import type { WorkingHours } from "~/types/Clinic";

type Props = {
    workingHours: WorkingHours;
    // booked: Record<string, number[]>;
    onSelect: (dateTime: string) => void;
};

export default function TimeSelector({ workingHours, onSelect }: Props) {
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [bookedSlots, setBooked] = useState<number[]>([])
    const { getBooked } = useAppointmentStore()

    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    const generateSlots = (start: string, end: string) => {
        const startH = parseInt(start.split(":")[0]);
        const endH = parseInt(end.split(":")[0]);

        let arr = [];
        for (let i = startH; i < endH; i++) arr.push(i);
        return arr;
    };

    // fetch booked hours 
    useEffect(() => {
        const fetchBooked = async () => {
            const bookedData = await getBooked(date)
            setBooked(bookedData)
        }
        fetchBooked()
    }, [date])

    useEffect(() => {
        if (!date) return;

        const day = new Date(date).getDay();
        const workingDay = workingHours.find((d) => d.day === day);

        if (!workingDay || !workingDay.isOpen) {
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
    }, [selected]);

    return (
        <div className="space-y-4">

            {/* DATE */}
            <div>
                <label className="text-sm text-gray-600 block mb-1">التاريخ</label>
                <input
                    type="date"
                    min={getMinDate()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {/* SLOTS */}
            {slots.length > 0 && (
                <div>
                    <p className="text-sm text-gray-600 mb-2">اختر الوقت</p>

                    <div className="grid grid-cols-4 gap-2">
                        {slots.map((h) => {
                            const isBooked = bookedSlots.includes(h);
                            return (
                                <button
                                    type="button"
                                    disabled={isBooked}
                                    key={h}
                                    onClick={() => setSelected(h)}
                                    className={`p-3 rounded-xl text-sm border transition
                                    ${isBooked ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : selected === h
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-blue-50"}`}
                                >
                                    {h >= 12 ? `${h - 12 || 12} PM` : `${h} AM`}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
            }

            {
                slots.length === 0 && date && (
                    <p className="text-red-500 text-sm">
                        لا يوجد مواعيد متاحة في هذا اليوم
                    </p>
                )
            }

        </div >
    );
}