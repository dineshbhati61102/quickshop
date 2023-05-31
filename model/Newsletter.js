const mongoose = require("mongoose")

const NewsletterSchema = new mongoose.Schema({
    name:{
        type:String,
          trim : true, 
        required:[true,"Name is Must Required!!!"]
    },

    email:{
        type:String,
          trim : true,
        required:[true,"Email Id Must Required!!!"],
        unique:true
    }
})

NewsletterSchema.pre('save', function(next) {
  this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
  next();
});


const Newsletter = new mongoose.model("Newsletter",NewsletterSchema)
module.exports = Newsletter