export const DEFAULT_CLINIC_WORKING_HOURS = Array.from({ length: 7 }, (_, day) => ({
    day,
    isOpen: day !== 6,
    start: "08:00",
    end: "17:00"
}));
export const DAYS = [
    { key: 0, label: "السبت" },
    { key: 1, label: "الأحد" },
    { key: 2, label: "الاثنين" },
    { key: 3, label: "الثلاثاء" },
    { key: 4, label: "الأربعاء" },
    { key: 5, label: "الخميس" },
    { key: 6, label: "الجمعة" },
];