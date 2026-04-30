const router = require("express").Router()

const { createAppointment, loadAppointments, getTodayAppointments, getUpcomingAppointments, getExpiredAppointments, confirmAppointment, declineAppointment, searchAppointments, getBooked } = require("../controllers/appointment.controller")

const validate = require("../middleware/validate.middleware")
const { appointmentSchema } = require("../validations/appointment.validation")
const verifyToken = require("../middleware/verifyToken")

router.use(verifyToken)

router.post("/", validate(appointmentSchema), createAppointment)

router.get("/", loadAppointments)
router.get("/today", getTodayAppointments)
router.get("/upcoming", getUpcomingAppointments)
router.get("/expired", getExpiredAppointments)
router.patch("/confirm/:id", confirmAppointment)
router.patch("/decline/:id", declineAppointment)
router.get("/search", searchAppointments)
router.get("/booked", getBooked)
module.exports = router