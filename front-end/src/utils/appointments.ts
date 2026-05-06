import type { WorkingHours } from "../types/Clinic";

import dayjs from 'dayjs';

export const getFullDate = (date: string) => dayjs(date).format('dddd, DD MMMM YYYY - hh:mm A')

export const getAppointmentHour = (date: string) => dayjs(date).format('hh:mm A');

export const getAppointmentDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

export const checkExpired = (date: string) => dayjs(date).isBefore(dayjs());

export const getAvailableHours = (workingHours: WorkingHours[], date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();

    const isToday =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate();

    const day = selectedDate.getDay();

    const workingDay = workingHours.find((d) => d.day === day);

    if (!workingDay || !workingDay.isOpen) {
        return [];
    }

    const startHour = parseInt(workingDay.start.split(":")[0]);
    const endHour = parseInt(workingDay.end.split(":")[0]);

    let effectiveStart = startHour;

    if (isToday) {
        const currentHour = today.getHours();
        effectiveStart = Math.max(startHour, currentHour + 1);
    }

    return generateSlots(effectiveStart, endHour);
}

const generateSlots = (startHour: number, endHour: number) => {
    const arr: number[] = [];

    for (let i = startHour; i < endHour; i++) {
        arr.push(i);
    }

    return arr;
};

export const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];;
};