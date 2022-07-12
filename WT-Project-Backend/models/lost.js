const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// create posts schema -- // moved from app.js //
const lostSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    mobile_no:{
        type:Number,
        required:true,
    },
    itemname: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    question: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    url: {
        type: String,
        required:true,
    },

    
},{
    collection:'lost'
});
module.exports = mongoose.model('lost', lostSchema);