const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
          trim : true,
        required:[true,"User Id Must Required!!!"],
    },
    productId:{
        type:String,
          trim : true,
        required:[true,"Product Id Must Required!!!"],
    },
    name:{
        type:String,
          trim : true,
        required:[true,"Name Must Required!!!"],
    },
    color:{
        type:String,
          trim : true,
        required:[true,"Color Must Required!!!"],
    },
    size:{
        type:String,
          trim : true,
        required:[true,"Size Must Required!!!"],
    },
    price:{
        type:Number,
        required:[true,"Price Must Required!!!"],
    },
    qty:{
        type:Number,
        default : 1,
        required:[true,"Quantity Must Required!!!"],
    },
    total:{
        type:Number,
        required:[true,"Total Must Required!!!"],
    },
    pic:{
        type:String,
        default:""
    }
})


CartSchema.pre('save', function(next) {
  this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
  next();
});


const Cart = new mongoose.model("Cart",CartSchema)
module.exports = Cart