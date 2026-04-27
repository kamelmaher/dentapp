const Clinic = require("../models/Clinic")
const statusText = require("../data/statusText");
const { MAIN_LIMIT } = require("../data/constants");

const getSingleClinic = async (req, res) => {
    const { slug } = req.params;
    if (!slug)
        return res.json({ status: statusText.ERROR, data: "Clinic Not Found" })
    const clinic = await Clinic.findOne({ slug })
    if (!clinic)
        return res.json({ status: statusText.ERROR, data: "Clinic Not Found" })
    res.json({ status: statusText.SUCCESS, data: clinic })
}
const getClinics = async (req, res) => {
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    const clinics = await Clinic.find().limit(MAIN_LIMIT).skip(skip)
    res.json({ status: statusText.SUCCESS, data: clinics })
}
const updateClinic = async (req, res) => {
    const { id } = req.params;
    if (!id) res.json({ status: statusText.FAIL, data: "Id is required" })
    res.send(id)
}

module.exports = {
    getSingleClinic,
    getClinics,
    updateClinic
}