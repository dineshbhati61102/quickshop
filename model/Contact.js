const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Name is Must"] },
    email: { type: String, required: [true, "Email is Must"] },
    subject: { type: String, required: [true, "Subject is Must"] },
    phone: { type: String, required: [true, "Phone Number is Must"] },
    message: { type: String, required: [true, "Message is Must"] },
    status: { type: String, default: "Active" },
    date: { type: String }
})

const Contact = new mongoose.model("Contact", ContactSchema)

module.exports = Contact