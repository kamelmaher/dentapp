const express = require("express")
const router = express.Router()

// controllers 
const { login, register, me, logout, updateUser, getAllUsers } = require("../controllers/user.controller")

// Middlewares
const validate = require("../middleware/validate.middleware")
const verifyToken = require("../middleware/verifyToken")
const verifyManager = require("../middleware/verifyManager")

// Validations 
const { registerSchema, loginSchema } = require("../validations/auth.validation")



// routes
router.post("/login", validate(loginSchema), login)
router.post("/register", validate(registerSchema), register)
router.post("/logout", logout)

router.get("/me", verifyToken, me)
router.patch("/", verifyToken, updateUser)

router.get("/", verifyToken, verifyManager, getAllUsers)
module.exports = router