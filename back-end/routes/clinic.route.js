const express = require("express")
const router = express.Router()

const { getClinicBySlug, getClinics, updateClinic, getClinicDetails } = require("../controllers/clinic.controller")

const verifyToken = require("../middleware/verifyToken")

// Genereal Clinics
router.get("/", getClinics)
router.get("/slug/:slug", getClinicBySlug)

// User Clinic
router.get("/dashboard", verifyToken, getClinicDetails)
router.patch("/:id", verifyToken, updateClinic)

module.exports = router