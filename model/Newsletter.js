const mongoose = require("mongoose")

const NewsletterSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Name is Must Required!!!"]
    },

    email:{
        type:String,
        required:[true,"Email Id Must Required!!!"],
        unique:true
    }
})
const Newsletter = new mongoose.model("Newsletter",NewsletterSchema)
module.exports = Newsletter