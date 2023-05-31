const express = require("express")
const Checkout = require("../model/Checkout")
const Router = express.Router()
const [verifyToken, verifyTokenAdmin] = require('../verification');

Router.post("/", verifyToken, async(req,res)=>{
    try{
        const Data = new Checkout(req.body)
        Data.date = new Date()
        await Data.save()
        res.send({result:"Done",message:"Record is Created!!!",data:Data})
    }
    catch(error){
        if(error.errors.userId)
        res.status(400).send({result:"Failed",message:error.errors.userId.message})
        else if(error.errors.totalAmount)
        res.status(400).send({result:"Failed",message:error.errors.totalAmount.message})
        else if(error.errors.shippingAmount)
        res.status(400).send({result:"Failed",message:error.errors.shippingAmount.message})
        else if(error.errors.finalAmount)
        res.status(400).send({result:"Failed",message:error.errors.finalAmount.message})
        else
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
        console.log(error);
    }
})

Router.get("/", verifyTokenAdmin, async(req,res)=>{
    try{
        const Data = await Checkout.find().sort({_id:-1})
        res.send({result:"Done",total:Data.length,data:Data})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
Router.get("/user/:userId", verifyToken, async(req,res)=>{
    try{
        const Data = await Checkout.find({userId:req.params.userId}).sort({_id:-1})
        res.send({result:"Done",total:Data.length,data:Data})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.get("/:_id", verifyTokenAdmin, async(req,res)=>{
    try{
        const Data = await Checkout.findOne({_id:req.params._id})
        if(Data)
        res.send({result:"Done",data:Data})
        else
        res.status(404).send({result:"Failed",message:"No Record Found"})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
Router.put("/:_id", verifyTokenAdmin, async(req,res)=>{
    try{
        const Data = await Checkout.findOne({_id:req.params._id})
        if(Data){
            Data.paymentMode = req.body.paymentMode??Data.paymentMode
            Data.paymentStatus = req.body.paymentStatus??Data.paymentStatus
            Data.orderStatus = req.body.orderStatus??Data.orderStatus
            Data.rppid = req.body.rppid??Data.rppid
            await Data.save()
            res.send({result:"Done",message:"Record is Updated!!!"})
        }
        else
        res.status(404).send({result:"Failed",message:"No Record Found"})
    }
    catch(error){
        if(error.keyValue)
        res.status(400).send({result:"Failed",message:"Name Must Be Unique"})
        else
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
Router.delete("/:_id", verifyTokenAdmin, async(req,res)=>{
    try{
        await Checkout.deleteOne({_id:req.params._id})
        res.send({result:"Done",message:"Record is Deleted!!!"})            
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
module.exports = Router