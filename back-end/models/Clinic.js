const plans = require("../data/plans")
const mongoose = require("mongoose")

const clinicSchema = new mongoose.Schema({
    clinicId: String,
    userId: String,
    clinicName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    phoneNumber: String,
    logo: String,
    description: String,
    email: String,
    address: String,
    plan: {
        type: String,
        enum: [plans.FREE, plans.MONTHLY, plans.UNLIMITED],
        default: plans.FREE
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    validTo: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
})

const Clinic = mongoose.model("Clinic", clinicSchema)
module.exports = Clinic