import React, {useState, useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { GetProductAction } from '../Store/Actions/ProductAction'
import { useSelector, useDispatch } from 'react-redux'
import {CreateCartAction, GetCartAction} from "../Store/Actions/CartAction"
import {GetWishlistAction, CreateWishlistAction} from "../Store/Actions/WishlistAction"


const ProductDetails = () => {
    var {_id} = useParams()
    const [Qty, setQty] = useState(1);
    var navigate = useNavigate()
    const [Product, setProduct] = useState([]);
    var dispatch = useDispatch()
   var  allProducts = useSelector((state)=> state.ProductStateData)
   var  allCarts = useSelector((state)=> state.CartStateData)
   var  allWishlists = useSelector((state)=> state.WishlistStateData)

   function getApiData() {
    dispatch(GetCartAction())
    dispatch(GetProductAction())
    dispatch(GetWishlistAction())
    var item = allProducts.find((item)=> item._id === _id)
    if (item) {
    setProduct(item)
  }
  }

function addTocart() {
  var item = allCarts.find((item)=> item.productId === _id && item.userId === localStorage.getItem("UserId"))
  if (item) {
    navigate("/cart")
  }else{
    var item = {
      productId: Product._id,
      userId: localStorage.getItem("UserId"),
      name: Product.name,
      color: Product.color,
      size: Product.size,
      price: Product.finalprice,
      qty: Qty,
      total: Product.finalprice * Qty,
      pic: Product.pic1,
    }
    dispatch(CreateCartAction(item))
    navigate("/cart")
  }
}

 function addToWishlist() {
   var item = allWishlists.find((item)=> item.productId === _id && item.userId === localStorage.getItem("UserId"))
   if (item) {
       navigate("/wishlist")
   }else{
    var item = {
      productId: Product._id,
      userId: localStorage.getItem("UserId"),
      name: Product.name,
      color: Product.color,
      size: Product.size,
      price: Product.finalprice,
      pic: Product.pic1,
    }
      dispatch(CreateWishlistAction(item))
      navigate("/wishlist")
   }
 }
useEffect(() => {
   getApiData()
}, [allProducts.length, allCarts.length, allWishlists.length]);

  return (
    <>
      {/* <!-- Page Header Start --> */}
    <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
            <h1 className="font-weight-semi-bold text-uppercase mb-3">Product Details</h1>
            <div className="d-inline-flex">
                <p className="m-0"><Link to="/">Home</Link></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Product Details</p>
            </div>
        </div>
    </div>
    {/* <!-- Page Header End --> */}


    {/* <!-- Shop Detail Start --> */}
<div className="container-fluid py-5">
<div className="row px-xl-5">
<div className="col-lg-5 pb-5">
<div id="product-carousel" className="carousel slide" data-ride="carousel">
<div className="carousel-inner border">
<div className="carousel-item active">
<img className="w-100 h-100" src={`/public/products/${Product.pic1}`} alt={Product.name}/>
</div>
<div className="carousel-item">
<img className="w-100 h-100" src={`/public/products/${Product.pic2}`} alt={Product.name}/>
</div>
<div className="carousel-item">
<img className="w-100 h-100" src={`/public/products/${Product.pic3}`} alt={Product.name}/>
</div>
<div className="carousel-item">
<img className="w-100 h-100" src={`/public/products/${Product.pic4}`} alt={Product.name}/>
</div>
</div>
<a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
<i className="fa fa-2x fa-angle-left text-dark"></i>
</a>
<a className="carousel-control-next" href="#product-carousel" data-slide="next">
<i className="fa fa-2x fa-angle-right text-dark"></i>
</a>
</div>
</div>

<div className="col-lg-7 pb-5">
<h3 className="font-weight-semi-bold">{Product.name}</h3>
<div className="d-flex mb-3">
<div className="text-primary mr-2">
<small className="fas fa-star"></small>
<small className="fas fa-star"></small>
<small className="fas fa-star"></small>
<small className="fas fa-star-half-alt"></small>
<small className="far fa-star"></small>
</div>
<small className="pt-1">(50 Reviews)</small>
</div>
<h5 className="font-weight-semi-bold mb-2">Price: <del>&#8377;{Product.baseprice}</del> <sup className='text-primary'>&nbsp;{Product.discount}%Off</sup></h5>
<h5 className="font-weight-semi-bold mb-4">Final Price: &#8377;{Product.finalprice}</h5>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Category:</span>
<span>{Product.maincategory}</span>
</div>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Brand:</span>
<span>{Product.brand}</span>
</div>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Size:</span>
<span>{Product.size}</span>
</div>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Colors:</span>
<span>{Product.color}</span>
</div>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Stock:</span>
<span>{Product.stock}</span>
</div>

<div className="d-flex mb-1">
<span className="text-dark font-weight-medium mb-0 mr-3">Description:</span>
<span>{Product.description}</span>
</div>

<div className="d-flex align-items-center mb-4 pt-2">
<h6>Quantity: &nbsp;</h6>
<div className="input-group quantity mr-3" style={{width: "200px"}}>
<div className="input-group-btn ">
<button className="btn btn-primary text-light btn-minus" onClick={()=>{ 
   if(Qty>1){
     setQty(Qty-1)}
   }}>
<i className="fa fa-minus"></i>
</button>
</div>
<div className='w-25  text-center'><p className='fs-5 px-1'>{Qty}</p></div>
<div className="input-group-btn">
<button className="btn btn-primary text-light btn-plus" onClick={()=> setQty(Qty+1)}>
<i className="fa fa-plus"></i>
</button>
</div>
</div>
</div>


<div className='p-3'>
<button onClick={addTocart} className="btn btn-primary px-3 text-light mr-3"><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
<button  onClick={addToWishlist}  className="btn border btn btn-primary px-3 text-light"><i className="fas fa-heart"></i> Add To Wishlist</button>
</div>

<div className="d-flex pt-2">
<p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
<div className="d-inline-flex">
<a className="text-dark px-2" href="">
<i className="fab fa-facebook-f"></i>
</a>
<a className="text-dark px-2" href="">
<i className="fab fa-twitter"></i>
</a>
<a className="text-dark px-2" href="">
<i className="fab fa-linkedin-in"></i>
</a>
<a className="text-dark px-2" href="">
<i className="fab fa-pinterest"></i>
</a>
</div>
</div>
</div>
</div>
</div>


{/* <!-- Shop Detail Start --> */}  
    </>
  )
}

export default ProductDetails
