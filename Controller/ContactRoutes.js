const express = require('express');
const Contact = require('../model/Contact');
const Router = express.Router()
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dineshbhati7834@gmail.com", // generated ethereal user
      pass: "xlzsywsqfskgdmvt" // generated ethereal password
    },
  });

Router.get("/", async(req,res)=>{
    try {
        const Data = await Contact.find().sort({_id:-1})
        if (Data) {
        res.status(200).send({ result: "Done", message:"All Records", total:Data.length, data:Data })    
        }else{
            res.status(404).send({ result: "Failed", message: "!!404 Not Found!!" })
        }
        
    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!!Internal Server Error!!" })
    }    
})



Router.get("/:_id", async(req,res)=>{
    try {
        const Data = await Contact.find({_id:req.params._id})
        if (Data) {
        res.status(200).send({ result: "Done", message:"Single Contact", data:Data })    
        }else{
            res.status(404).send({ result: "Failed", message: "!!404 Not Found!!" })
        }
        
    } catch (error) {
        res.status(500).send({ result: "Failed", message: "!!Internal Server Error!!" })
    }    
})


Router.post("/", async (req, res) => {
    try {
        const Data = new Contact(req.body)
        if (Data) {
            Data.date = new Date()
            await Data.save()
        res.status(201).send({ result: "Done", message: "Contact is Created", data:Data })
            try {
            let mailOptions = {
                from: 'dineshbhati7834@gmail.com',
                to: req.body.email, 
                subject: "Your Query Recieved", 
                text: "Thank you For Share Your Query, Our Team Will Contact You Soon", 
              }
              transporter.sendMail(mailOptions,(error, result)=>{
                if (error) {
                    console.log(error);
                }
              })
              let mailOptions2 = {
                from: 'dineshbhati7834@gmail.com', 
                to: 'dineshbhati7834@gmail.com', 
                subject: req.body.subject, 
                text:  req.body.message, 
              }
              transporter.sendMail(mailOptions2,(error, result)=>{
                if (error) {
                    console.log(error);
                }
              })
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(404).send({ result: "Failed", message: "!!404 Not Found!!" })
        }

    } catch (error) {
        if (error.errors.name) {
            res.status(400).send({ result: "Failed", message: error.errors.name.message })
        } else if (error.errors.email) {
            res.status(400).send({ result: "Failed", message: error.errors.email.message })
        } else if (error.errors.subject) {
            res.status(400).send({ result: "Failed", message: error.errors.subject.message })
        } else if (error.errors.phone) {
            res.status(400).send({ result: "Failed", message: error.errors.phone.message })
        }else if (error.errors.message) {
        res.status(400).send({ result: "Failed", message: error.errors.message.message })
    } else {
            res.status(500).send({ result: "Failed", message: "!!Internal Server Error!!" })
            console.log(error);
        }
    }
})


Router.delete("/delete/:_id", async(req,res)=>{
      try {
         await Contact.deleteOne({_id:req.params._id})   
        res.status(200).send({ result: "Done", message: "Contact is Deleted"}) 
      } catch (error) {
        res.status(500).send({ result: "Failed", message: "!!Internal Server Error!!"})
        console.log(error);
      }
})


Router.put("/update/:_id", async(req,res)=>{
     try {
         const Data = await Contact.findOne({_id:req.params._id})
         if (Data) {
            Data.name = req.body.name  ??  Data.name
            Data.email = req.body.email  ??  Data.email
            Data.subject = req.body.subject  ??  Data.subject
            Data.phone = req.body.phone  ??  Data.phone
            Data.message = req.body.subject  ??  Data.subject

            await Data.save()
            res.status(200).send({result:"Done", message:"Contact is Updated"})
         }else{
            res.status(404).send({result:"Failed", message:"404 Not Found"})
         }       
     } catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error"})
        console.log(error);
     }
})



module.exports = Router