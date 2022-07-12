const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null,
        required:true
    },
    email: {
        type: String,
        default: null,
        required:true
    }
});

module.exports = mongoose.model('user', userSchema);
