const { z } = require("zod")

const registerSchema = z.object({
    userName: z.string().trim().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    clinicName: z.string().min(2),
    phoneNumber: z.string().min(9)
})

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

module.exports = { registerSchema, loginSchema }