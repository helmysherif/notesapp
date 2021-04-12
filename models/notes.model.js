const mongoose = require("mongoose");
const notesSchema = mongoose.Schema({
    title:String,
    desc:String,
    userID:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})
module.exports = mongoose.model('note' , notesSchema);