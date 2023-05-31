const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
          trim : true,
        required:[true,"Name Must Required!!!"]
    },
    maincategory:{
        type:String,
          trim : true,
        required:[true,"Maincategory Must Required!!!"]
    },
    subcategory:{
        type:String,
          trim : true,
        required:[true,"Subcategory Must Required!!!"]
    },
    brand:{
        type:String,
          trim : true,
        required:[true,"Brand Must Required!!!"]
    },
    size:{
        type:String,
          trim : true,
        required:[true,"Size Must Required!!!"]
    },
    color:{
        type:String,
          trim : true,
        required:[true,"Color Must Required!!!"]
    },
    baseprice:{
        type:Number,
        required:[true,"Base Price Must Required!!!"]
    },
    discount:{
        type:Number,
        default:0
    },
    finalprice:{
        type:Number
    },
    stock:{
        type:String,
        default:"In Stock"
    },
    description:{
        type:String,
          trim : true,
        default:"This is Sample Products"
    },
    pic1:{
        type:String,
        default:""
    },
    pic2:{
        type:String,
        default:""
    },
    pic3:{
        type:String,
        default:""
    },
    pic4:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:"Active"
    }

})


ProductSchema.pre('save', function(next) {
    this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
    next();
  });



const Product =  new mongoose.model("Product",ProductSchema)

module.exports = Product