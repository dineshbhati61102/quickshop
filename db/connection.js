const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/QuickShop").then(()=>{
//     console.log("Database is Connected");
// }).catch(()=>{
//     console.log("Connection Failed");
// })



mongoose.connect(process.env.DBKEY).then(()=>{
    console.log("Database is Connected");
}).catch(()=>{
    console.log("Connection Failed");
})