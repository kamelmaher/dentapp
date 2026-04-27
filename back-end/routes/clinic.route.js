const express = require("express")
const router = express.Router()
const { getSingleClinic, getClinics, updateClinic } = require("../controllers/clinic.controller")

router.get("/:slug", getSingleClinic)
router.get("/", getClinics)
router.patch("/:id", updateClinic)

module.exports = router