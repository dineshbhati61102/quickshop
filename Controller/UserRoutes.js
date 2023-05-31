const express = require('express');
const Router = express.Router()
const User = require('../model/User');
const multer = require('multer')
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodemailer = require('nodemailer');
const schema = new passwordValidator();
const [verifyToken, verifyTokenAdmin] = require('../verification');


schema
    .is().min(8)                                    // Minimum length 8
    .is().max(30)                                   // Maximum length 30
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Admin@123', 'User@123']);   // Blacklist these values



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_SENDER, // generated ethereal user
      pass: process.env.MAIL_SENDER_PASS, // generated ethereal password
    },
  });




Router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const Data = await User.find().sort({ _id: -1 })
        if (Data) {
            res.status(200).send({ result: "Done", message: "All Users", totalRecords: Data.length, data: Data })
        } else {
            res.status(404).send({ result: "Failed", message: "!! 404 Not Found !!" })
        }
    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!! Internal Server Error !!" })
        console.log(error);
    }

});

Router.get("/:_id", verifyToken, async (req, res) => {
    try {
        const Data = await User.find({ _id: req.params._id })
        if (Data) {
            res.status(200).send({ result: "Done", message: "Single User", data: Data })
        } else {
            res.status(404).send({ result: "Failed", message: "!! 404 Not Found !!" })
        }

    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!! Internal Server Error !!" })
        console.log(error);
    }

});


Router.get("/admin/:_id", verifyTokenAdmin, async (req, res) => {
    try {
        const Data = await User.findOne({ _id: req.params._id })
        if (Data)
            res.status(200).send({ result: "Done", data: Data })
        else
            res.status(404).send({ result: "Failed", message: "No Record Found" })
    }
    catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
    }
})

Router.post("/signup",async (req, res) => {
    const email = await User.findOne({email:req.body.email})
    const username = await User.findOne({username:req.body.username})
    if (!email && !username) {
    const Data = new User(req.body)
    if (schema.validate(req.body.password)) {
        if (req.body.password == req.body.cpassword) {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    res.status(500).send({ result: "Failed", message: "Internal Server Error while Creating Hash Password" })
                } else {
                    try {
                        Data.password = hash
                        Data.cpassword = hash
                        await Data.save()
                        res.status(200).send({ result: "Done", message: "You Have Successfully Signup", data: Data })
                    } catch (error) {
                 if (error.errors.name) { res.status(400).send({ result: "Failed", message: error.errors.name.message }) }
                        else if (error.errors.username) { res.status(400).send({ result: "Failed", message: error.errors.username.message }) }
                        else if (error.errors.email) { res.status(400).send({ result: "Failed", message: error.errors.email.message }) }
                        else if (error.errors.phone) { res.status(400).send({ result: "Failed", message: error.errors.phone.message }) }
                        else if (error.errors.password) { res.status(400).send({ result: "Failed", message: error.errors.password.message }) }
                        else { res.status(500).send({ result: "Failed", message: "Internal Server Error" }) }
                    }
                }
            })
        } else { res.status(400).send({ result: "Failed", message: "Password are Not Matched" }) }
    } else {
        res.status(400).send({ result: "Failed", message: "Invalid Password!!! Password Length Must Be on Minimum 8 and Maximum 100 also include 1 upper case character, 1 lower case character and not include any space, And These Passwords 'Admin@123', 'User@123' are not Allowed" })
    }
}else{ res.status(400).send({ result: "Failed", message: "Email Or Username already exists" }) }

});


Router.put("/update-user/:_id", verifyToken, upload.single("pic"), async(req,res)=>{
    try {
        const Data = await User.findOne({_id:req.params._id})
        if (Data) {
            Data.name = req.body.name ?? Data.name
            Data.email = req.body.email ?? Data.email
            Data.username = req.body.username ?? Data.username
            Data.phone = req.body.phone ?? Data.phone
            Data.addressline1 = req.body.addressline1 ?? Data.addressline1
            Data.addressline2 = req.body.addressline2 ?? Data.addressline2
            Data.addressline3 = req.body.addressline3 ?? Data.addressline3
            Data.pin = req.body.pin ?? Data.pin
            Data.city = req.body.city ?? Data.city
            Data.state = req.body.state ?? Data.state
            Data.status = req.body.status ?? Data.status
    
            try {
                if (req.file && Data.pic) {
                    fs.unlinkSync(`public/users/${Data.pic}`)
                }
            } catch (error) {console.log(error);}


            if (req.file) {
                Data.pic = req.file.filename
            }
                await Data.save()
                res.status(200).send({ result: "Done", message: "Record is Updated" })
    
            
           
        }else{
        res.status(404).send({ result: "Failed", message: "No Record Found" })
        }

    } catch (error) {
        if (error.keyValue){
        res.status(400).send({ result: "Failed", message: "Name Must Be Unique" })
        }else{
            res.status(500).send({ result: "Failed", message: "Internal Server Error" })
            console.log(error);
        }
    }
    
})


Router.put("/update-admin/:_id", verifyTokenAdmin, upload.single("pic"), async(req,res)=>{
    try {
        const Data = await User.findOne({_id:req.params._id})
        if (Data) {
            Data.name = req.body.name ?? Data.name
            Data.email = req.body.email ?? Data.email
            Data.username = req.body.username ?? Data.username
            Data.phone = req.body.phone ?? Data.phone
            Data.addressline1 = req.body.addressline1 ?? Data.addressline1
            Data.addressline2 = req.body.addressline2 ?? Data.addressline2
            Data.addressline3 = req.body.addressline3 ?? Data.addressline3
            Data.pin = req.body.pin ?? Data.pin
            Data.city = req.body.city ?? Data.city
            Data.state = req.body.state ?? Data.state
            Data.status = req.body.status ?? Data.status
    
            try {
                if (req.file && Data.pic) {
                    fs.unlinkSync(`public/users/${Data.pic}`)
                }
            } catch (error) {console.log(error);}


            if (req.file) {
                Data.pic = req.file.filename
            }
                
            await Data.save()
                res.status(200).send({ result: "Done", message: "Record is Updated" })
    
           
        }else{
        res.status(404).send({ result: "Failed", message: "No Record Found" })
        }

    } catch (error) {
        if (error.keyValue){
        res.status(400).send({ result: "Failed", message: "Name Must Be Unique" })
        }else{
            res.status(500).send({ result: "Failed", message: "Internal Server Error" })
            console.log(error);
        }
    }
    
})


Router.post("/login", async (req, res) => {
    try {
        const Data = await User.findOne({ username: req.body.username })
        if (Data) {
            bcrypt.compare(req.body.password, Data.password, function (err, result) {
                if (err) {
                    res.status(500).send({ result: "Failed", message: "!! Internal Server Error !!" })
                    console.log(err);
                }else{
                if (result) {
                    if (Data.role==="Admin") {
                        jwt.sign({Data}, process.env.SAULTKEYADMIN, function(err,token) {
                            if (err) {
                                res.status(500).send({ result: "Failed", message: "Internal Server Error while Generating Token" })
                                console.log(err);
                            }else{
                                res.status(200).send({ result: "Done", message: "You Have Successfully Login", data:Data, token, token  })
                            }
                        })
                    }else{
                    jwt.sign({Data}, process.env.SAULTKEYUSER, function(err,token) {
                        if (err) {
                            res.status(500).send({ result: "Failed", message: "Internal Server Error while Generating Token" })
                            console.log(err);
                        }else{
                            res.status(200).send({ result: "Done", message: "You Have Successfully Login", data:Data, token, token })
                    
                        }
                    })
                }
                } else {
                    res.status(404).send({ result: "Failed", message: "Username Or Password Not Matched" })
                }
            }
            })
        } else {
            res.status(404).send({ result: "Failed", message: "Username Or Password Not Matched" })
        }
    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!! Internal Server Error !!" })
        console.log(error,"dd");
    }

});



Router.delete("/:_id", verifyTokenAdmin, async (req, res) => {
    try {
        const Data = await User.findOne({ _id: req.params._id })
        if (Data) {
        try {
            fs.unlinkSync(`public/users/${Data.pic}`)
             } catch (error) {}
             
        await Data.deleteOne()
        res.status(200).send({ result: "Done", message: "Record is Deleted" })
        
    }else{ res.status(404).send({ result: "Failed", message: "Record Already Deleted" })
    console.log(error);}

    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!! Internal Server Error !!" })
        console.log(error);
    }

});


Router.post("/reset-password", async(req,res)=>{
    try {
     const Data = await User.findOne({username:req.body.username})
     if (Data) {
         const otp = Math.floor(100000 + Math.random() * 900000);
         Data.otp = otp
  let mailOption = {
    from: process.env.MAIL_SENDER, 
    to: Data.email,
    subject: "OTP For PASSWORD RESET : Team Developer",
    text: `OTP for Password Reset is ${otp}\nTeam Eshopper\n` , 
  }
   transporter.sendMail(mailOption,async (err,result)=>{
    if (err) {
        console.log(err);
        res.status(500).send({result:"Failed", message: err})
    }else{
        res.status(200).send({result:"Done", message:"Otp Sent On Registered Email ID"})
        await Data.save()
    }
   })

     }else{
        res.status(401).send({result:"Failed", message:"Invalid Username"})
     }
    } catch (error) {
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
        console.log(error);
    }
})

Router.post("/verify-otp", async(req,res)=>{
    try {
        const Data = await User.findOne({username:req.body.username})
        if (Data) {
            if (Data.otp===req.body.otp) {
                res.status(200).send({result:"Done", message:"Otp Verified"})  
            }else{
                res.status(401).send({result:"Failed",message:"Invalid Otp"})
            }    
        }else{
            res.status(401).send({result:"Done", message:"invalid Username"})  
        }
        
    } catch (error) {
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
        console.log(error);
    }
    
    
})

Router.post("/new-password", async(req,res)=>{
    try {
        const Data = await User.findOne({username:req.body.username})
        if (Data) {
            if (schema.validate(req.body.password)) {
          if (req.body.password === req.body.cpassword) {
              bcrypt.hash(req.body.password, 10, async(err,hash)=>{
                 if (err) {
                    res.status(500).send({ result: "Failed", message: "Internal Server Error while Creating Hash Password" })
                 }else{
                    Data.password = hash
                    Data.cpassword = hash
                    await Data.save()
                    res.status(500).send({ result: "Done", message: "Password is Successfuly Changed" })

                 }
              })
            }else{ res.status(400).send({ result: "Failed", message: "Password Are Not Matching" })}
                
            }else{
        res.status(400).send({ result: "Failed", message: "Invalid Password!!! Password Length Must Be on Minimum 8 and Maximum 100 also include 1 upper case character, 1 lower case character and not include any space" })
            }

       }else{
            res.status(401).send({result:"Done", message:"invalid Username"})  
        }
        
    } catch (error) {
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
        console.log(error);
    }
})

module.exports = Router



  

