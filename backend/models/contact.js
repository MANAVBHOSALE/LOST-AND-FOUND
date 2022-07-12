const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// create posts schema -- // moved from app.js //
const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true,
    },
    lastname: {
        type: String,
        required:true,
    },
    country: {
        type: String,
        required:true,
    },
    subject: {
        type: String,
        required:true,
    },   
},{
    collection:'contact'
});
module.exports = mongoose.model('contact', contactSchema);