const express = require("express")
const Wishlist = require("../model/Wishlist")
const [verifyToken, verifyTokenAdmin] = require('../verification');

const Router = express.Router()

Router.post("/", verifyToken, async(req,res)=>{
    try{
        const Data = new Wishlist(req.body)
        await Data.save()
        res.send({result:"Done",message:"Record is Created!!!",data:Data})
    }
    catch(error){
        if(error.errors.userId)
        res.status(400).send({result:"Fail",message:error.errors.userId.message})
        else if(error.errors.productId)
        res.status(400).send({result:"Fail",message:error.errors.productId.message})
        else if(error.errors.name)
        res.status(400).send({result:"Fail",message:error.errors.name.message})
        else if(error.errors.color)
        res.status(400).send({result:"Fail",message:error.errors.color.message})
        else if(error.errors.size)
        res.status(400).send({result:"Fail",message:error.errors.size.message})
        else if(error.errors.price)
        res.status(400).send({result:"Fail",message:error.errors.price.message})
        else
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})

Router.get("/:userId", verifyToken, async(req,res)=>{
    try{
        const Data = await Wishlist.find({userId:req.params.userId}).sort({name:1})
            res.send({result:"Done",total:Data.length,data:Data})

    }
    catch(error){
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})

Router.delete("/:_id", verifyToken, async(req,res)=>{
    try{
        await Wishlist.deleteOne({_id:req.params._id})
        res.send({result:"Done",message:"Record is Deleted!!!"})            
    }
    catch(error){
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})
module.exports = Router