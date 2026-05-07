const rateLimit = require("express-rate-limit");

const limiter = (hours = 12, max = 1) => {
    return rateLimit({
        windowMs: hours * 60 * 60 * 1000,
        max: max,
        message: "محاولات كثيرة، حاول لاحقًا"
    })
};

module.exports = limiter