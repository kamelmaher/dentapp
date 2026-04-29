const router = require("express").Router()

const { createAppointment, loadAppointments, getTodayAppointments, getUpcomingAppointments, getExpiredAppointments } = require("../controllers/appointment.controller")

const validate = require("../middleware/validate.middleware")
const { appointmentSchema } = require("../validations/appointment.validation")
const verifyToken = require("../middleware/verifyToken")

router.post("/", validate(appointmentSchema), createAppointment)
router.get("/", verifyToken, loadAppointments)
router.get("/today", verifyToken, getTodayAppointments)
router.get("/upcoming", verifyToken, getUpcomingAppointments)
router.get("/expired", verifyToken, getExpiredAppointments)

module.exports = router