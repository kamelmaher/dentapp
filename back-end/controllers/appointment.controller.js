const Appointment = require("../models/Appointment")
const statusText = require("../data/statusText")
const { MAIN_LIMIT } = require("../data/constants")

const createAppointment = async (req, res) => {
    const data = new Appointment(req.body)
    await data.save()
    res.json({ status: statusText.SUCCESS, data })
}

const loadAppointments = async (req, res) => {
    const user = req.user;
    const page = req.qurey
    const skip = MAIN_LIMIT * (+page - 1)
    if (!user) return res.json({ status: statusText.ERROR, data: "UnAuthorized" })
    const appointments = await Appointment.find({ clinicId: user.clinicId }).limit(MAIN_LIMIT).skip(skip)
    if (appointments.length == 0) return res.json({ status: statusText.FAIL, data: "No Appointments for this Clinic" })
    res.json({ status: statusText.SUCCESS, data: appointments })
}

const getTodayAppointments = async (req, res) => {
    const user = req.user
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
        clinicId: user.clinicId,
        date: {
            $regex: `^${today}`
        }
    });

    res.json({ status: statusText.SUCCESS, data: appointments })
}

const getUpcomingAppointments = async (req, res) => {
    const user = req.user
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0)

    const next10Days = new Date();
    next10Days.setDate(tomorrow.getDate() + 10);

    const start = tomorrow.toISOString().slice(0, 19);
    const end = next10Days.toISOString().slice(0, 19);

    const appointments = await Appointment.find({
        clinicId: user.clinicId,
        date: {
            $gte: start,
            $lte: end
        }
    }).sort({ date: 1 });

    res.json({ status: statusText.SUCCESS, data: appointments });
}

module.exports = {
    createAppointment,
    loadAppointments,
    getTodayAppointments,
    getUpcomingAppointments
}