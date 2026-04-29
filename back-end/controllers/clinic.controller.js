const Clinic = require("../models/Clinic")
const statusText = require("../data/statusText");
const { MAIN_LIMIT } = require("../data/constants");

const getClinics = async (req, res) => {
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    const clinics = await Clinic.find().limit(MAIN_LIMIT).skip(skip)
    res.json({ status: statusText.SUCCESS, data: clinics })
}

const getClinicBySlug = async (req, res) => {
    const { slug } = req.params;
    if (!slug)
        return res.json({ status: statusText.ERROR, data: "Clinic Not Found" })
    const clinic = await Clinic.findOne({ slug })
    if (!clinic)
        return res.json({ status: statusText.ERROR, data: "Clinic Not Found" })
    res.json({ status: statusText.SUCCESS, data: clinic })
}

const updateClinic = async (req, res) => {
    const { id } = req.params;
    if (!id) res.json({ status: statusText.FAIL, data: "Id is required" })
    res.send(id)
}

const getClinicDetails = async (req, res) => {
    const user = req.user;
    if (!user) return res.json({ status: statusText.ERROR, data: "UnAuthorized" })
    const clinic = await Clinic.find({ userId: user._id })
    if (clinic.length == 0) return res.json({ status: statusText.FAIL, data: "No Clinics for this user" })
    res.json({ status: statusText.SUCCESS, data: clinic[0] })
}

module.exports = {
    getClinicBySlug,
    getClinics,
    updateClinic,
    getClinicDetails
}