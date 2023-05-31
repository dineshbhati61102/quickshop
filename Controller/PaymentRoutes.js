const express = require('express');
const Razorpay = require("razorpay")
const Checkout = require('../model/Checkout');
const User = require('../model/User');
const  [verifyToken, verifyTokenAdmin] = require("../verification")
const nodemailer = require('nodemailer');
const Router = express.Router()


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_SENDER, // generated ethereal user
      pass: process.env.MAIL_SENDER_PASS // generated ethereal password
    },
  });


//Payment API
Router.post("/orders", verifyToken, async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RP_KEY_ID,
        key_secret: process.env.RP_SECRET_KEY,
      });
  
      const amount = parseInt(req.body.amount);
      if (isNaN(amount)) {
        return res.status(400).json({ message: "Invalid amount. Amount must be an integer." });
      }
  
      const options = {
        amount: amount * 100, // Convert to smallest currency unit
        currency: "INR",
      };
  
      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    
    }});

Router.put("/verify",verifyToken, async (req, res) => {
    try {
        var check = await Checkout.findOne({ _id: req.body.checkid })
        check.rppid = req.body.razorpay_payment_id
        check.paymentStatus = "Done"
        check.paymentMode="Net Banking"
        await check.save()
        var user = await User.findOne({_id:check.userId})
        let mailOption = {
            from: process.env.MAIL_SENDER,
            to: user.email,
            subject: "Payment Done !!! : Team QuickShop",
            text: `Thanks to Shop with Us\nYour Payment is Confirmed\nTrack Order in Profile Section!!!\nTeam QuickShop`
        }
        transporter.sendMail(mailOption, (error, data) => {
            if (error)
                console.log(error);
        })
        res.status(200).send({ result: "Done" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});


module.exports = Router