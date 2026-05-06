import type { WorkingHours } from "../types/Clinic";

const DAYS = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
];

export function formatWorkingHours(hours: WorkingHours[]) {
    if (!hours) return
    const openDays = hours
        .filter((d) => d.isOpen)
        .sort((a, b) => a.day - b.day);

    if (!openDays.length) return "مغلق";

    const start = openDays[0];
    let end = openDays[0];

    for (let i = 1; i < openDays.length; i++) {
        if (
            openDays[i].day === end.day + 1 &&
            openDays[i].start === start.start &&
            openDays[i].end === start.end
        ) {
            end = openDays[i];
        } else {
            break;
        }
    }

    const formatTime = (t: string) => {
        const [h] = t.split(":");
        const hour = Number(h);
        return hour > 12 ? `${hour - 12} مساءً` : `${hour} صباحًا`;
    };

    const dayRange =
        start.day === end.day
            ? DAYS[start.day]
            : `${DAYS[start.day]} - ${DAYS[end.day]}`;

    return `${dayRange}: ${formatTime(start.start)} - ${formatTime(start.end)}`;
}