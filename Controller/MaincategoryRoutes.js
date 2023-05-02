const express = require("express")
const Maincategory = require("../model/Maincategory")
const Router = express.Router()

Router.post("/",async(req,res)=>{
    try{
        const Data = new Maincategory(req.body)
        await Data.save()
        res.send({result:"Done",message:"Record is Created!!!",data:Data})
    }
    catch(error){
        if(error.keyValue)
        res.status(400).send({result:"Fail",message:"Name Must Be Unique"})
        else if(error.errors.name)
        res.status(400).send({result:"Fail",message:error.errors.name.message})
        else
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})

Router.get("/",async(req,res)=>{
    try{
        const Data = await Maincategory.find().sort({_id:-1})
        res.send({result:"Done",total:Data.length,data:Data})
    }
    catch(error){
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})

Router.get("/:_id",async(req,res)=>{
    try{
        const Data = await Maincategory.findOne({_id:req.params._id})
        if(Data)
        res.send({result:"Done",data:Data})
        else
        res.status(404).send({result:"Fail",message:"No Record Found"})
    }
    catch(error){
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})
Router.put("/:_id",async(req,res)=>{
    try{
        const Data = await Maincategory.findOne({_id:req.params._id})
        if(Data){
            Data.name = req.body.name??Data.name
            Data.status = req.body.status??Data.status
            await Data.save()
            res.send({result:"Done",message:"Record is Updated!!!"})
        }
        else
        res.status(404).send({result:"Fail",message:"No Record Found"})
    }
    catch(error){
        if(error.keyValue)
        res.status(400).send({result:"Fail",message:"Name Must Be Unique"})
        else
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})
Router.delete("/:_id",async(req,res)=>{
    try{
        await Maincategory.deleteOne({_id:req.params._id})
        res.send({result:"Done",message:"Record is Deleted!!!"})            
    }
    catch(error){
        res.status(500).send({result:"Fail",message:"Internal Server Error"})
    }
})
module.exports = Router