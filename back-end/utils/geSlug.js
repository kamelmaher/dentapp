module.exports = (name) => {
    return name.trim().split(" ").join("-").toLowerCase()
}

// Smile Desk -> smile-desk
