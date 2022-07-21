const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const foundSchema = new mongoose.Schema({
    itemname: {
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
    collection:'found'
});
module.exports = mongoose.model('found', foundSchema);