import { combineReducers } from "redux"

import {MaincategoryReducer} from "./MaincategoryReducer"
import {SubcategoryReducer} from "./SubcategoryReducer"
import {BrandReducer} from "./BrandReducer"
import {ProductReducer} from "./ProductReducer"
import {ContactReducer} from "./ContactReducer"
import {NewsletterReducer} from "./NewsletterReducer"
import {CheckoutReducer} from "./CheckoutReducer"
import {UserReducer} from "./UserReducer"
import {CartReducer} from "./CartReducer"
import {WishlistReducer} from "./WishlistReducer"


export default combineReducers({
      MaincategoryStateData : MaincategoryReducer,
      SubcategoryStateData : SubcategoryReducer,
      BrandStateData : BrandReducer,
      ProductStateData : ProductReducer,
      ContactStateData : ContactReducer,
      NewsletterStateData : NewsletterReducer,
      CheckoutStateData : CheckoutReducer,
      UserStateData : UserReducer,
      CartStateData : CartReducer,
      WishlistStateData : WishlistReducer,
       
})