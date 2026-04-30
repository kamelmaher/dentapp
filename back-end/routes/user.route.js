const express = require("express")
const router = express.Router()

// controllers 
const { login, register, me, logout, updateUser } = require("../controllers/user.controller")

// Middlewares
const validate = require("../middleware/validate.middleware")
const verifyToken = require("../middleware/verifyToken")
// Validations 
const { registerSchema, loginSchema } = require("../validations/auth.validation")



// routes
router.post("/login", validate(loginSchema), login)
router.post("/register", validate(registerSchema), register)
router.post("/logout", logout)

router.get("/me", verifyToken, me)
router.patch("/", verifyToken, updateUser)

module.exports = router