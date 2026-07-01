const { DECLINED, PENDING } = require("../data/appointmentStatus")
const { MAX_APPOINTMENTS_FOR_PATIENT } = require("../data/constants")
const dayjs = require("dayjs")

const removeCancelled = (appointments) => {
    if (!appointments || appointments.length == 0) return []
    return appointments.filter(e => e.status != DECLINED)
}

const checkIfTwoPendingAppointments = (appointments) => {
    let counter = 0;
    if (appointments.length == 0) return false
    appointments.map(e => {
        if (e.status == PENDING) counter += 1
    })
    console.log(counter)
    return counter >= MAX_APPOINTMENTS_FOR_PATIENT
}

const getUpcomingDate = () => {
    const startOfTomorrow = dayjs().add(1, 'day').startOf('day').toDate();
    const endOfRange = dayjs().add(11, 'day').endOf('day').toDate();
    return { $gte: startOfTomorrow, $lte: endOfRange }
}

const getTodayDate = () => {
    const startOfDay = dayjs().startOf('day').toDate();
    const endOfDay = dayjs().endOf('day').toDate();
    return {
        $gte: startOfDay,
        $lte: endOfDay
    }
}

const getExpiredDate = () => {
    const now = dayjs().toDate();
    return {
        $lt: now
    }
}
module.exports = {
    removeCancelled,
    checkIfTwoPendingAppointments,
    getTodayDate,
    getExpiredDate,
    getUpcomingDate
}