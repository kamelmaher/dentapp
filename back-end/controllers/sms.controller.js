const smsSender = require("../services/smsSender")
const dayjs = require("dayjs");
const statusText = require("../data/statusText")
const { getPickApptMsg, getConfirmApptMsg } = require("../utils/index");
const User = require("../models/User");

const appointmentPick = async (req, res) => {
    const { patientName, date } = req.body;
    try {
        const clinic = req.clinic
        if (!clinic) return res.json({ status: statusText.ERROR, data: "العيادة غير موجودة" })
        if (!patientName || !date) return res.json({ status: statusText.ERROR, data: "تاكد من صحة البيانات" })
        const message = getPickApptMsg(date, patientName)
        await smsSender(message, clinic.phoneNumber)
        return res.json({ status: statusText.SUCCESS })
    } catch (err) {
        return res.json({ status: statusText.ERROR, data: "حدث خطا ما" })
    }
}

const appointmentConfirm = async (req, res) => {
    const { patientName, patientPhoneNumber, date, status } = req.body
    try {
        const clinic = req.clinic
        if (!clinic) return res.json({ status: statusText.ERROR, data: "العيادة غير موجودة" })

        if (!patientName || !date || !patientPhoneNumber || !status) return res.json({ status: statusText.ERROR, data: "تاكد من صحة البيانات" })

        const message = getConfirmApptMsg(date, status, patientName, clinic.clinicName)
        await smsSender(message, patientPhoneNumber)
        return res.json({ status: statusText.SUCCESS, data: "تم اعلام المريض بنجاح" })
    } catch (err) {
        return res.json({ status: statusText.ERROR, data: "حدث خطا ما" })
    }
}

module.exports = {
    appointmentPick,
    appointmentConfirm
}