// {
//     title:"",
//     author:"",
//     date:"",
//     imageUrl:"",
//     description:"",
// }

const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add title"]
    },
    author: {
        type: String,
        required: [true, "Please add author"]
    },
    date: {
        type: String,
        required: [true, "Please add date"]
    },
    imageUrl: {
        type: String,
        required: [true, "Please add image URL"]
    },
    description: {
        type: String,
        required: [true, "Please add Newsletter description"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
