const express = require("express")
const Cart = require("../model/Cart")
const Router = express.Router()
const [verifyToken, verifyTokenAdmin] = require('../verification');

Router.post("/", verifyToken, async(req,res)=>{
    try{
        const Data = new Cart(req.body)
        await Data.save()
        res.send({result:"Done",message:"Record is Created!!!",data:Data})
    }
    catch(error){
        if(error.errors.userId)
        res.status(400).send({result:"Failed",message:error.errors.userId.message})
        else if(error.errors.productId)
        res.status(400).send({result:"Failed",message:error.errors.productId.message})
        else if(error.errors.name)
        res.status(400).send({result:"Failed",message:error.errors.name.message})
        else if(error.errors.color)
        res.status(400).send({result:"Failed",message:error.errors.color.message})
        else if(error.errors.size)
        res.status(400).send({result:"Failed",message:error.errors.size.message})
        else if(error.errors.price)
        res.status(400).send({result:"Failed",message:error.errors.price.message})
        else if(error.errors.qty)
        res.status(400).send({result:"Failed",message:error.errors.qty.message})
        else if(error.errors.total)
        res.status(400).send({result:"Failed",message:error.errors.total.message})
        else
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.get("/:_id", async(req,res)=>{
    try {
       const Data = await Cart.findOne({_id:req.params._id})
       res.send({result:"Done",total:Data.length,data:Data}) 
    } catch (error) {
    res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.get("/user/:userId", verifyToken, async(req,res)=>{
    try{
        const Data = await Cart.find({userId:req.params.userId}).sort({_id:-1})
        res.send({result:"Done",total:Data.length,data:Data})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})

Router.get("/:_id", verifyToken, async(req,res)=>{
    try{
        const Data = await Cart.findOne({_id:req.params._id})
        if(Data)
        res.send({result:"Done",data:Data})
        else
        res.status(404).send({result:"Failed",message:"No Record Found"})
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
Router.put("/:_id", verifyToken, async(req,res)=>{
    try{
        const Data = await Cart.findOne({_id:req.params._id})
        if(Data){
            Data.qty = req.body.qty??Data.qty
            Data.total = req.body.total??Data.total
            await Data.save()
            res.send({result:"Done",message:"Record is Updated!!!"})
            console.log(Data);
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
Router.delete("/:_id", verifyToken, async(req,res)=>{
    try{
        await Cart.deleteOne({_id:req.params._id})
        res.send({result:"Done",message:"Record is Deleted!!!"})            
    }
    catch(error){
        res.status(500).send({result:"Failed",message:"Internal Server Error"})
    }
})
module.exports = Router