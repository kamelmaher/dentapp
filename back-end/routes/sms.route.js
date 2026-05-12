const router = require("express").Router()

const { appointmentConfirm, appointmentPick } = require("../controllers/sms.controller")
const checkSmsSubscriped = require("../middleware/checkSmsSubscriped")

router.use(checkSmsSubscriped)
router.post("/pick-sms", appointmentPick)
router.post("/confirm-sms", appointmentConfirm)
module.exports = router