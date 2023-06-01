const express = require('express');
const Product = require('../model/Product');
const multer = require('multer');
const fs = require('fs');
const [verifyToken, verifyTokenAdmin] = require('../verification');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
const Router = express.Router()

Router.get("/", async (req, res) => {
    try {
        const Data = await Product.find().sort({ _id:-1 })
        res.send({ result: "Done", total: Data.length, data: Data })
    }
    catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
    }
})




Router.get("/:_id", async (req, res) => {
    try {
        const Data = await Product.findOne({ _id: req.params._id })
        if (Data)
            res.send({ result: "Done", data: Data })
        else
            res.status(404).send({ result: "Failed", message: "No Record Found" })
    }
    catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
    }
})

Router.post("/", verifyTokenAdmin, upload.fields([
            {name:"pic1", maxCount: 1},
            {name:"pic2", maxCount: 1},
            {name:"pic3", maxCount: 1},
            {name:"pic4", maxCount: 1}
    ]), async(req,res)=>{
        try {
            const Data = new Product(req.body)
    if (Data) {
        Data.finalprice = Math.round(parseInt(req.body.baseprice) - parseInt(req.body.baseprice) * parseInt(req.body.discount) / 100)
        if (req.files && req.files.pic1)
        Data.pic1 = req.files.pic1[0].filename
    if (req.files && req.files.pic2)
        Data.pic2 = req.files.pic2[0].filename
    if (req.files && req.files.pic3)
        Data.pic3 = req.files.pic3[0].filename
    if (req.files && req.files.pic4)
        Data.pic4 = req.files.pic4[0].filename
    await Data.save()
    res.send({ result: "Done", message: "Record is Created!!!", data: Data })
}    
  } catch (error) {
            console.log(error);
            if (error.errors.name)
                res.status(400).send({ result: "Failed", message: error.errors.name.message })
            else if (error.errors.maincategory)
                res.status(400).send({ result: "Failed", message: error.errors.maincategory.message })
            else if (error.errors.subcategory)
                res.status(400).send({ result: "Failed", message: error.errors.subcategory.message })
            else if (error.errors.brand)
                res.status(400).send({ result: "Failed", message: error.errors.brand.message })
            else if (error.errors.size)
                res.status(400).send({ result: "Failed", message: error.errors.size.message })
            else if (error.errors.color)
                res.status(400).send({ result: "Failed", message: error.errors.color.message })
            else if (error.errors.baseprice)
                res.status(400).send({ result: "Failed", message: error.errors.baseprice.message })
            else
                res.status(500).send({ result: "Failed", message: "Internal Server Error" })
        
        }
    
})


Router.put("/update/:_id", verifyTokenAdmin, upload.fields([
    {name:"pic1", maxCount: 1},
    {name:"pic2", maxCount: 1},
    {name:"pic3", maxCount: 1},
    {name:"pic4", maxCount: 1}
]), async(req,res)=>{
try {
    const Data = await Product.findOne({_id:req.params._id})
if (Data) {
            Data.name = req.body.name ?? Data.name
            Data.maincategory = req.body.maincategory ?? Data.maincategory
            Data.subcategory = req.body.subcategory ?? Data.subcategory
            Data.brand = req.body.brand ?? Data.brand
            Data.size = req.body.size ?? Data.size
            Data.color = req.body.color ?? Data.color
            Data.stock = req.body.stock ?? Data.stock
            Data.description = req.body.description ?? Data.description
            Data.baseprice = req.body.baseprice ?? Data.baseprice
            Data.discount = req.body.discount ?? Data.discount
            Data.finalprice = Math.round(parseInt(Data.baseprice) - parseInt(Data.baseprice) * parseInt(Data.discount) / 100)
            Data.status = req.body.status ?? Data.status
            try {
                if (req.files.pic1 && Data.pic1) {
                    fs.unlinkSync(`public/products/${Data.pic1}`)
                }
            } catch (error) {  console.log(error);}
            if(req.files && req.files.pic1)
            Data.pic1 = req.files.pic1[0].filename

            try {
                if (req.files.pic2 && Data.pic2) {
                    fs.unlinkSync(`public/products/${Data.pic2}`)
                }
            } catch (error) { console.log(error); }
            if(req.files && req.files.pic2)
            Data.pic2 = req.files.pic2[0].filename

            try {
                if (req.files.pic3 && Data.pic3) {
                    fs.unlinkSync(`public/products/${Data.pic3}`)
                }
            } catch (error) {  console.log(error);}
            if(req.files && req.files.pic3)
            Data.pic3 = req.files.pic3[0].filename

            try {
                if (req.files.pic4 && Data.pic4) {
                    fs.unlinkSync(`public/products/${Data.pic4}`)
                }
            } catch (error) {  console.log(error);}
            if(req.files && req.files.pic4)
            Data.pic4 = req.files.pic4[0].filename

            await Data.save()
            res.send({ result: "Done", message: "Record is Updated!!!" })
        }
        else
            res.status(404).send({ result: "Failed", message: "No Record Found" })

}catch (error) {
    if (error.keyValue)
        res.status(400).send({ result: "Failed", message: "Name Must Be Unique" })
    else
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
}
})



Router.delete("/:_id", verifyTokenAdmin, async (req, res) => {
    try {
        const Data = await Product.findOne({ _id: req.params._id })
        try {
            fs.unlinkSync(`public/products/${Data.pic1}`)
        } catch (error) { }
        try {
            fs.unlinkSync(`public/products/${Data.pic2}`)
        } catch (error) { }
        try {
            fs.unlinkSync(`public/products/${Data.pic3}`)
        } catch (error) { }
        try {
            fs.unlinkSync(`public/products/${Data.pic4}`)
        } catch (error) { }
        await Data.deleteOne()
        res.send({ result: "Done", message: "Record is Deleted!!!" })
    }
    catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
    }
})

Router.post("/search", async(req,res)=>{
    try{
    const Data = await Product.find({
        "$or":[
            {name:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {maincategory:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {subcategory:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {brand:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {color:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {size:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {stock:{$regex:`.*${req.body.search}.*`,$options:"i"}},
        ]})

        res.send({result:"Done",count:Data.length,data:Data})

}catch (error) {
        res.status(500).send({ result: "Failed", message: "Internal Server Error" })
        console.log(error);
    }
})

module.exports = Router






