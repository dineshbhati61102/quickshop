const mongoose = require("mongoose")

const MaincategorySchema = new mongoose.Schema({
    name:{
        type:String,
          trim : true,
        required:[true,"Name Must Required!!!"],
        unique:true
    },
    status:{
        type:String,
          trim : true,
        default:"Active"
    }
})

MaincategorySchema.pre('save', function(next) {
  this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
  next();
});

const Maincategory = new mongoose.model("Maincategory", MaincategorySchema)
module.exports = Maincategory