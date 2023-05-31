import { all } from "redux-saga/effects"

import { UserSaga } from "./UserSaga"
import { MaincategorySaga } from "./MaincategorySaga"
import { SubcategorySaga } from "./SubcategorySaga"
import { BrandSaga } from "./BrandSaga"
import { ProductSaga } from "./ProductSaga"
import { ContactSaga } from "./ContactSaga"
import { NewsletterSaga } from "./NewsletterSaga"
import { CheckoutSaga } from "./CheckoutSaga"
import { CartSaga } from "./CartSaga"
import { WishlistSaga } from "./WishlistSaga"


export default function* RootSaga() {
     yield all([
          UserSaga(),
          MaincategorySaga(),
          SubcategorySaga(),
          BrandSaga(),
          ProductSaga(),
          ContactSaga(),
          NewsletterSaga(),
          CheckoutSaga(),
          CartSaga(),
          WishlistSaga(),


     ])
     // code after all-effect
}