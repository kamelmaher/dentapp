const DEFAULT_CLINIC_WORKING_HOURS = Array.from({ length: 7 }, (_, day) => ({
    day,
    isOpen: day !== 6,
    start: "08:00",
    end: "17:00"
}));

module.exports = {
    DEFAULT_CLINIC_WORKING_HOURS
}