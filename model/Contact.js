const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name: { type: String,  trim : true, required: [true, "Name is Must"] },
    email: { type: String,  trim : true, required: [true, "Email is Must"] },
    subject: { type: String,  trim : true, required: [true, "Subject is Must"] },
    phone: { type: String,  trim : true, required: [true, "Phone Number is Must"] },
    message: { type: String,  trim : true, required: [true, "Message is Must"] },
    status: { type: String, default: "Active" },
    date: { type: String }
})



ContactSchema.pre('save', function(next) {
    this.name = this.name.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space and trim leading/trailing whitespace
    next();
  });


const Contact = new mongoose.model("Contact", ContactSchema)

module.exports = Contact