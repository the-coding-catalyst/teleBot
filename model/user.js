const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)