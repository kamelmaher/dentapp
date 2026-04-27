const Appointment = require("../models/Appointment")
const statusText = require("../data/statusText")
const getAppointments = async (req, res) => {
    const data = await Appointment.find()
    res.send(data)
}

const createAppointment = async (req, res) => {
    const data = new Appointment(req.body)
    await data.save()
    res.json({ status: statusText.SUCCESS, data })
}
module.exports = {
    getAppointments,
    createAppointment,
}