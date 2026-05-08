const rateLimit = require("express-rate-limit");
const { ERROR } = require("../data/statusText")
const limiter = (hours = 12, max = 1) => {
    return rateLimit({
        windowMs: hours * 60 * 60 * 1000,
        max: max,
        handler: (req, res) => {
            return res.status(429).json({
                status: ERROR,
                data: "محاولات كثيرة، حاول لاحقًا"
            });
        }
    });
};

module.exports = limiter