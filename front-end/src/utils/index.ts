export const dateFormatter = (date: string, hour: number) => `${date}T${hour}:00:00`;;


export const formatHour = (hour: number) => hour > 12 ? hour - 12 : hour 