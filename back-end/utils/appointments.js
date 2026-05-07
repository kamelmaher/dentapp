const { DECLINED, PENDING } = require("../data/appointmentStatus")
const { MAX_APPOINTMENTS_FOR_PATIENT } = require("../data/constants")

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

module.exports = {
    removeCancelled,
    checkIfTwoPendingAppointments
}