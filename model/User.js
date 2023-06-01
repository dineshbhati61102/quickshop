const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
          trim : true,
        required:[true,"Name is Must"]
    },
    email:{
        type:String,
          trim : true,
        required:[true,"email is Must"],

    },
    username:{
        type:String,
          trim : true,
        required:[true,"username is Must"],
    },
    phone:{
        type:String,
          trim : true,
        required:[true,"phone is Must"],
        
    },
    password:{
        type:String,
          trim : true,
        required:[true,"password is Must"]
    },
    cpassword:{
        type:String,
          trim : true,
        required:[true,"Confirm Your Password"]
    },

    addressline1:{
        type:String,
          trim : true,
        default:""
    },
    addressline2:{
        type:String,
          trim : true,
        default:""
    },
    addressline3:{
        type:String,
          trim : true,
        default:""
    },
    pin:{
        type:String,
          trim : true,
        default:""
    },
    city:{
        type:String,
          trim : true,
        default:""
    },
    state:{
        type:String,
          trim : true,
        default:""
    },
    pic:{
        type:String,
        default:""
    },
    otp:{
        type:Number,
        default:-11551
    },
    
    role:{
        type:String,
          default:"User"
         },

    status:{
        type:String,
        default:"Active"
    }
})


UserSchema.pre('save', function(next) {
  this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
  next();
});


const User = new mongoose.model("User",UserSchema)

module.exports = User