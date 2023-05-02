const express = require('express');
const app = express()
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()
require("./db/connection")
const cors = require('cors');
app.use(express.json())
app.use(cors())

app.use("/public", express.static("public"))
app.use(express.static(path.join(__dirname,"build")))

const ContactRoutes = require("./Controller/ContactRoutes")
const UserRoutes = require("./Controller/UserRoutes")
const ProductRoutes = require("./Controller/ProductRoutes")
const BrandRoutes = require("./Controller/BrandRoutes")
const CartRoutes = require("./Controller/CartRoutes")
const MaincategoryRoutes = require("./Controller/MaincategoryRoutes")
const NewsletterRoutes = require("./Controller/NewsletterRoutes")
const SubcategoryRoutes = require("./Controller/SubcategoryRoutes")
const WishlistRoutes = require("./Controller/WishlistRoutes")
const CheckoutRoutes = require("./Controller/CheckoutRoutes")






app.use("/contact/", ContactRoutes)
app.use("/user/", UserRoutes)
app.use("/product/", ProductRoutes)
app.use("/brand/", BrandRoutes)
app.use("/cart/", CartRoutes)
app.use("/maincategory/", MaincategoryRoutes)
app.use("/newsletter/", NewsletterRoutes)
app.use("/subcategory/", SubcategoryRoutes)
app.use("/wishlist/", WishlistRoutes)
app.use("/checkout/", CheckoutRoutes)









app.use("*", express.static(path.join(__dirname,"build")))
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is Running At Port: ${PORT}`);
})
