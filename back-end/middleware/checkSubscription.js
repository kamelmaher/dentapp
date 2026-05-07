const Clinic = require("../models/Clinic")
const statusText = require("../data/statusText")
const dayjs = require("dayjs")

module.exports = async (req, res, next) => {
    const user = req.user
    if (!user) return res.json({ status: statusText.ERROR, data: "المستخدم غير موجود" })
    const clinic = await Clinic.findById(user.clinicId)
    if (!clinic)
        return res.json({
            status: statusText.ERROR,
            data: "العيادة غير موجودة"
        });

    if (!clinic.validTo) {
        return res.status(403).json({
            status: statusText.ERROR,
            data: "لا يوجد اشتراك نشط لهذه العيادة"
        });
    }

    const isExpired = dayjs().isAfter(dayjs(clinic.validTo));
    if (isExpired) {
        return res.status(402).json({
            status: statusText.ERROR,
            data: "انتهت صلاحية اشتراك العيادة، يرجى التجديد للمتابعة"
        });
    }
    next()
}