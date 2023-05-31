// SERVICE FOR USER
export async function GetUserApi() {
  var response = await fetch("/user", {
        method: "get",
        headers: { "content-type": "application/json",
        "Authorization": localStorage.getItem("token") },
    })
    return await response.json()
}

export async function CreateUserApi(data) {
  var response = await fetch("/user/signup", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateUserApi(data) {
  var response = await fetch(`/user/${data._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteUserApi(data) {
  var response = await fetch(`/user/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}




// SERVICE FOR CONTACT
export async function GetContactApi() {
  var response = await fetch("/contact",{
        method: "get",
        headers:{
        "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}

export async function CreateContactApi(data) {
  var response = await fetch("/contact", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateContactApi(data) {
  var response = await fetch(`/contact/update/${data._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteContactApi(data) {
  var response = await fetch(`/contact/delete/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}



// SERVICE FOR MAINCATEGORY
export async function GetMaincategoryApi() {
  var response = await fetch("/maincategory/")
    return await response.json()
}

export async function CreateMaincategoryApi(data) {
  var response = await fetch("/maincategory", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateMaincategoryApi(data) {
  var response = await fetch(`/maincategory/${data._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteMaincategoryApi(data) {
  var response = await fetch(`/maincategory/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}



// SERVICE FOR SUBCATEGORY
export async function GetSubcategoryApi() {
  var response = await fetch("/subcategory", {
        method: "get",
        headers: { "content-type": "application/json" },
    })
    return await response.json()
}

export async function CreateSubcategoryApi(data) {
  var response = await fetch("/subcategory", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateSubcategoryApi(data) {
  var response = await fetch(`/subcategory/${data._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteSubcategoryApi(data) {
  var response = await fetch(`/subcategory/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}




// SERVICE FOR BRAND
export async function GetBrandApi() {
  var response = await fetch("/brand", {
        method: "get",
        headers: { "content-type": "application/json" },
    })
    return await response.json()
}

export async function CreateBrandApi(data) {
  var response = await fetch("/brand", {
        method: "post",
        headers: { "content-type": "application/json",
        "Authorization": localStorage.getItem("token")
     },         
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateBrandApi(data) {
  var response = await fetch(`/brand/${data._id}`, {
        method: "put",
        headers: { "content-type": "application/json",
        "Authorization": localStorage.getItem("token")
     }, 
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteBrandApi(data) {
  var response = await fetch(`/brand/${data._id}`, {
        method: "delete",
        headers: { "content-type": "application/json",
        "Authorization": localStorage.getItem("token")
     }, 
    })
    return await response.json()
}



// SERVICE FOR CART
export async function GetCartApi() {
  var response = await fetch("/cart/user/"+localStorage.getItem("UserId"), {
        method: "get",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}

export async function CreateCartApi(data) {
  var response = await fetch("/cart", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateCartApi(data) {
  var response = await fetch("/cart/" + data._id, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function DeleteCartApi(data) {
  var response = await fetch("/cart/" + data._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}


// SERVICE FOR CHECKOUT
export async function GetCheckoutApi() {
  var response = await fetch("/checkout", {
        method: "get",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}

export async function GetCheckoutUserApi() {
    var response = await fetch("/checkout/user/"+localStorage.getItem("UserId"), {
        method: "get",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}

export async function CreateCheckoutApi(data) {
  var response = await fetch("/checkout", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function UpdateCheckoutApi(data) {
  var response = await fetch(`/checkout/${data._id}`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


export async function DeleteCheckoutApi(data) {
  var response = await fetch(`/checkout/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}




// SERVICE FOR PRODUCT
export async function GetProductApi() {
  var response = await fetch("/product", {
        method: "get",
        headers: { "content-type": "application/json" },
    })
    return await response.json()
}

export async function CreateProductApi(data) {
  var response = await fetch("/product", {
        method: "post",
        headers: {
            "Authorization": localStorage.getItem("token")
        },
        body: data
    })
    return await response.json()
    
}

export async function UpdateProductApi(data) {
  var response = await fetch(`/product/update/${data._id}`, {
        method: "put",
        headers: {
            "Authorization": localStorage.getItem("token")
        },
        body: data.data
    })
    return await response.json()
}

export async function DeleteProductApi(data) {
  var response = await fetch(`/product/${data._id}`, {
        method: "delete",
        headers: { "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}



// SERVICE FOR WISHLIST
export async function GetWishlistApi() {
  var response = await fetch("/wishlist/" + localStorage.getItem("UserId"), {
        method: "get",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}

export async function CreateWishlistApi(data) {
  var response = await fetch("/wishlist", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


export async function DeleteWishlistApi(data) {
  var response = await fetch(`/wishlist/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
    return await response.json()
}




// SERVICE FOR NEWSLETTER
export async function GetNewsletterApi() {
  var response = await fetch("/newsletter", {
        method: "get",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}

export async function CreateNewsletterApi(data) {
  var response = await fetch("/newsletter", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    })
    return await response.json()
}



export async function DeleteNewsletterApi(data) {
  var response = await fetch(`/newsletter/${data._id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}