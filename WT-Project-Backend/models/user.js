const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// create posts schema -- // moved from app.js //
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    
},{
    collection:'user'
});
module.exports = mongoose.model('user', userSchema);
