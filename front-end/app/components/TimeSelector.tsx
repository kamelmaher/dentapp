import { useEffect, useState } from "react";

const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// 🔥 بيانات من backend لاحقًا
const WORKING_HOURS = [
    { day: 0, isOpen: true, start: "10:00", end: "16:00" },
    { day: 1, isOpen: true, start: "10:00", end: "16:00" },
    { day: 2, isOpen: true, start: "10:00", end: "16:00" },
    { day: 3, isOpen: true, start: "10:00", end: "16:00" },
    { day: 4, isOpen: true, start: "10:00", end: "16:00" },
    { day: 5, isOpen: false },
    { day: 6, isOpen: false },
];

// 🔥 محجوز (من backend لاحقًا)
const BOOKED = {
    "2026-04-30": [11, 13],
};

export default function TimeSelector() {
    const [date, setDate] = useState("");
    const [dayIndex, setDayIndex] = useState<number | null>(null);
    const [slots, setSlots] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    const generateSlots = (start: string, end: string) => {
        const startHour = parseInt(start.split(":")[0]);
        const endHour = parseInt(end.split(":")[0]);

        let arr = [];
        for (let i = startHour; i < endHour; i++) {
            arr.push(i);
        }
        return arr;
    };

    useEffect(() => {
        if (!date) return;

        const day = new Date(date).getDay();
        setDayIndex(day);

        const workingDay = WORKING_HOURS.find((d) => d.day === day);

        if (!workingDay || !workingDay.isOpen) {
            setSlots([]);
            return;
        }

        const generated = generateSlots(workingDay.start, workingDay.end);
        setSlots(generated);
    }, [date]);

    const bookedSlots = BOOKED[date] || [];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6" dir="rtl">

            <h2 className="text-xl font-bold text-gray-800">
                احجز موعدك الآن
            </h2>

            {/* DATE */}
            <div>
                <label className="text-sm text-gray-600 mb-1 block">
                    اختر التاريخ
                </label>

                <input
                    type="date"
                    min={getMinDate()}
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setSelected(null);
                    }}
                    className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {/* DAY STATUS */}
            {dayIndex !== null && (
                <p className="text-sm text-gray-500">
                    اليوم: {DAYS[dayIndex]}
                </p>
            )}

            {/* CLOSED DAY */}
            {dayIndex !== null &&
                !WORKING_HOURS.find((d) => d.day === dayIndex)?.isOpen && (
                    <p className="text-red-500 text-sm">
                        هذا اليوم مغلق
                    </p>
                )}

            {/* SLOTS */}
            {slots.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-3">اختر الوقت</h3>

                    <div className="grid grid-cols-4 gap-2">

                        {slots.map((hour) => {
                            const isBooked = bookedSlots.includes(hour);

                            return (
                                <button
                                    key={hour}
                                    disabled={isBooked}
                                    onClick={() => setSelected(hour)}
                                    className={`p-3 rounded-xl border text-sm transition
                    ${isBooked
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : selected === hour
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-blue-50"
                                        }
                  `}
                                >
                                    {hour >= 12
                                        ? `${hour - 12 || 12} PM`
                                        : `${hour} AM`}
                                </button>
                            );
                        })}

                    </div>
                </div>
            )}

            {/* SELECTED */}
            {selected !== null && (
                <div className="bg-blue-50 p-3 rounded-xl text-sm text-blue-700">
                    تم اختيار الساعة:{" "}
                    <strong>
                        {selected >= 12
                            ? `${selected - 12 || 12} PM`
                            : `${selected} AM`}
                    </strong>
                </div>
            )}

            {/* SUBMIT */}
            <button
                disabled={!date || selected === null}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
                تأكيد الحجز
            </button>

        </div>
    );
}