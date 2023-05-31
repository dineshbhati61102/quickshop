const mongoose = require("mongoose")

const SubcategorySchema = new mongoose.Schema({
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

SubcategorySchema.pre('save', function(next) {
  this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
  next();
});


const Subcategory = new mongoose.model("Subcategory",SubcategorySchema)
module.exports = Subcategory