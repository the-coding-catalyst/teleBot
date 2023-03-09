const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    subscribers: []
})

module.exports = mongoose.model("User", userSchema)