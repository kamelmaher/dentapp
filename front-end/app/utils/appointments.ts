import { formatHour } from ".";

export const getAppointmentHour = (date: string) => {
    const hour = date.split("T")[1].slice(0, 2)
    const minutes = date.split("T")[1].slice(3, 5)
    const formatted = formatHour(+hour)
    return `${formatted}:${minutes}`
}
export const getAppointmentDate = (date: string) => date.split("T")[0]