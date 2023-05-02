const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Must"]
    },
    email:{
        type:String,
        required:[true,"email is Must"],

    },
    username:{
        type:String,
        required:[true,"username is Must"],
    },
    phone:{
        type:String,
        required:[true,"phone is Must"],
        
    },
    password:{
        type:String,
        required:[true,"password is Must"]
    },
    cpassword:{
        type:String,
        required:[true,"Confirm Your Password"]
    },

    addressline1:{
        type:String,
        default:""
    },
    addressline2:{
        type:String,
        default:""
    },
    addressline3:{
        type:String,
        default:""
    },
    pin:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
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


const User = new mongoose.model("User",UserSchema)

module.exports = User