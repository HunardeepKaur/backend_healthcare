const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    title:{
        type : String
    },
    image:String
})
module.exports = mongoose.model("Profile" , profileSchema);