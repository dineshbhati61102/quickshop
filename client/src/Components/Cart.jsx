import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {GetCartAction, DeleteCartAction, UpdateCartAction} from "../Store/Actions/CartAction"

const Cart = () => {
    var dispatch = useDispatch()
    const [Shipping, setShipping] = useState(0);
    const [Total, setTotal] = useState(0);
    const [Final, setFinal] = useState(0);
    const [Carts, setCarts] = useState([]);
    var allCarts = useSelector((state)=> state.CartStateData)

 function GetApiData() {
     dispatch(GetCartAction())
     if (allCarts.length) {
        setCarts(allCarts)
        var total = 0
        var shipping = 0
        var final = 0
        for (let item of allCarts) {
            total = total + item.total
        }
        if (total > 0 && total <= 500){
            shipping = 150
        }
        final = total + shipping
        setTotal(total)   
        setShipping(shipping)
        setFinal(final)
    }}



   function updateQty(_id, op) {
    var item = allCarts.find((item)=> item._id === _id)
    if (op==="dec" && item.qty == 1) {
        return
    }else if(op==="dec"){
        item.qty = item.qty - 1
        item.total = item.total - item.price
    }else{
        item.qty = item.qty + 1
        item.total = item.total + item.price
    }
    dispatch(UpdateCartAction(item))
    GetApiData()
   }

function deleteCart(_id) {
dispatch(DeleteCartAction({_id:_id}))
    GetApiData()
}
   
  useEffect(() => {
    GetApiData()
  }, [allCarts.length]);  
    return (
        <>
            {/* <!-- Page Header Start --> */}
            <div className="container-fluid">
            <div className="bg-secondary my-3 "> 
            <h1 className="font-weight-semi-bold text-capitalize text-center mb-3 py-2">Shopping Cart</h1>           
            </div>
            {/* <!-- Page Header End --> */}


      
            {/* <!-- Cart Start --> */}
            <div className="row mt-5">
            <div className="col mb-5">
            <table className="table table-bordered table-responsive-sm text-center mb-0">
            <thead className="bg-secondary text-dark">
            <tr>
            <th>Products</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
            </tr>
            </thead>
            <tbody className="align-middle">
           {Carts.map((elem,index)=>{
            return  <tr key={index}>
            <td className="align-middle"><img src={`/public/products/${elem.pic}`} alt="" style={{ width: "50px" }} /> {elem.name}</td>
            <td className="align-middle">{elem.color}</td>
            <td className="align-middle">{elem.size}</td>
            <td className="align-middle">&#8377;{elem.price}</td>
            <td className="align-middle">
            <div class="btn-group" role="group">
            <div className="input-group-btn">
            <button onClick={()=>updateQty(elem._id, "dec")} className="btn btn-sm btn-primary text-light btn-minus" >
            <i className="fa fa-minus"></i>
            </button>
            </div>
           <p className='px-2'>{elem.qty}</p>
            <div className="input-group-btn">
            <button onClick={()=>updateQty(elem._id, "inc")} className="btn btn-sm btn-primary text-light btn-plus">
            <i className="fa fa-plus"></i>
            </button>
            </div>
            </div>
            </td>

            <td className="align-middle">&#8377;{elem.total}</td>
            <td className="align-middle"><button onClick={()=> deleteCart(elem._id)} className="btn btn-sm btn-primary text-light"><i className="fa fa-times"></i></button></td>
            </tr>
            })}
            </tbody>
            </table>
            </div>
            </div>
    


            <div className='container w-50'>
            <div className="row">
            <div className="col-sm-12">
            <div className="card border-secondary mb-5">
            <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Cart Total</h4>
            </div>
            <div className="card-body">
            <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Subtotal</h6>
            <h6 className="font-weight-medium">{Total}</h6>
            </div>
            <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Delivery Charge</h6>
            <h6 className="font-weight-medium">{Shipping}</h6>
            </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
            <div className="d-flex justify-content-between mt-2">
            <h5 className="font-weight-bold">Total</h5>
            <h5 className="font-weight-bold">{Final}</h5>
            </div>
            <Link to="/checkout" className="btn btn-block btn-primary text-light my-3 py-3">Proceed To Checkout</Link>
            </div>
            </div>
            </div>    </div>
                </div>
           </div>
            {/* <!-- Cart End --> */}


        </>
    )
}

export default Cart
