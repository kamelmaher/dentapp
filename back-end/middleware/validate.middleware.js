const { z } = require("zod")
const statusText = require("../data/statusText")
module.exports = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        if (result.success)
            next()
        else {
            return res.json({ status: statusText.ERROR, data: "Please Check Inputs" })
        }
    }
}