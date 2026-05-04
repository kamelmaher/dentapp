const { DECLINED } = require("../data/appointmentStatus")
const removeCancelled = (appointments) => {
    if (!appointments || appointments.length == 0) return []
    return appointments.filter(e => e.status != DECLINED)
}

module.exports = {
    removeCancelled
}