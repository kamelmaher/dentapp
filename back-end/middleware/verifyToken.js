const statusText = require("../data/statusText")
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.json({ status: statusText.ERROR, data: "Token Required" })
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (user) {
        req.user = user
        return next()
    }
    return res.json(({ status: statusText.ERROR, data: "Invalid Token" }))
}