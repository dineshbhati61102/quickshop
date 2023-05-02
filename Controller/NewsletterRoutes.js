const express = require("express")
const Newsletter = require("../model/Newsletter")
const Router = express.Router()
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dineshbhati7834@gmail.com", // generated ethereal user
      pass: "xlzsywsqfskgdmvt" // generated ethereal password
    },
  });

Router.post("/",async(req,res)=>{
    try{
        const Data = new Newsletter(req.body)
        await Data.save()
        res.send({result:"Done",message:"Record is Created!!!",data:Data})

        let mailOptions = {
            from: 'dineshbhati7834@gmail.com',
            to: req.body.email, 
            subject: "Subscribed", 
            text: "Thank you For Subscribe Us, We Will Update Soon", 
          }
          transporter.sendMail(mailOptions,(error, result)=>{
            if (error) {
                console.log(error);
            }
          })
    }
    catch(error){
        if(error.keyValue)
        res.status(400).send({result:"Failed",message:"Your Email Id is Already Registered!!!"})
        else if(error.errors.name)
        res.status(400).send({result:"Failed",message:error.errors.name.message})
        else if(error.errors.email)
        res.status(400).send({result:"Failed",message:error.errors.email.message})
        else
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.get("/",async(req,res)=>{
    try{
        const Data = await Newsletter.find().sort({_id:-1})
        res.send({result:"Done",total:Data.length,data:Data})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.delete("/:_id",async(req,res)=>{
    try{
        await Newsletter.deleteOne({_id:req.params._id})
        res.send({result:"Done",message:"Record is Deleted!!!"})            
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
module.exports = Router