const { ERROR } = require("../data/statusText")
const { MANAGER } = require("../data/roles")
const statusText = require("../data/statusText")
const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
    const user = req.user
    if (!user) return res.json({ status: statusText.ERROR, data: "User Not Found " })
    if (user.role === MANAGER) {
        next()
    }
    else return res.json({ status: statusText.ERROR, data: "UnAuthorized" })
}