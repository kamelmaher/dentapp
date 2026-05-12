const Clinic = require("../models/Clinic")
const statusText = require("../data/statusText")
const dayjs = require("dayjs")
const plans = require("../data/plans")

module.exports = async (req, res, next) => {
    try {

        const { clinicId } = req.body

        if (!clinicId)
            return res.json({
                status: statusText.ERROR,
                data: "العيادة غير موجودة"
            });

        const clinic = await Clinic.findById(clinicId)
        if (!clinic)
            return res.json({
                status: statusText.ERROR,
                data: "العيادة غير موجودة"
            });

        if (!clinic.validTo || !clinic.plan) {
            return res.status(403).json({
                status: statusText.ERROR,
                data: "لا يوجد اشتراك نشط لهذه العيادة"
            });
        }

        const isExpired = dayjs().isAfter(dayjs(clinic.validTo));
        if (isExpired) {
            return res.json({
                status: statusText.ERROR,
                data: "انتهت صلاحية اشتراك العيادة، يرجى التجديد للمتابعة"
            });
        }

        if (clinic.plan === plans.ANNUAL || clinic.plan === plans.MONTHLY || clinic.plan === plans.LIFETIME) {
            req.clinic = clinic
            return next()
        }
    } catch (err) {
        return res.json({ status: statusText.ERROR })
    }
}