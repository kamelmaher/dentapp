const router = require("express").Router()

const { getAppointments, createAppointment } = require("../controllers/appointment.controller")
const validate = require("../middleware/validate.middleware")
const { appointmentSchema } = require("../validations/appointment.validation")
router.get("/", getAppointments)
router.post("/", validate(appointmentSchema), createAppointment)

module.exports = router