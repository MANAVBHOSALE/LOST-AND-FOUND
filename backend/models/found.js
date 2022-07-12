const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const foundSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile_no:{
        type:String,
        required:true,
    },
    itemname: {
        type: String,
        required:true,
        
    },
    property: {
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
    collection:'found'
});
module.exports = mongoose.model('found', foundSchema);