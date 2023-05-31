import React, { useEffect, useState } from 'react'
import LeftNav from "./LeftNav"
import { Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {GetCheckoutAction, UpdateCheckoutAction} from "../../Store/Actions/CheckoutAction"

const AdminSingleCheckout = () => {
     var {_id} = useParams()
     var dispatch = useDispatch()
     var allCheckouts = useSelector((state)=> state.CheckoutStateData)
    const [Checkouts, setCheckouts] = useState({});
    const [User, setUser] = useState({});
    const [OrderStatus, setOrderStatus] = useState("");
    const [PaymentStatus, setPaymentStatus] = useState("");



    async function GetApiData() {
        dispatch(GetCheckoutAction())
        var item = allCheckouts.find((item)=>  item._id === _id)
        if (item) {
          setCheckouts(item)
          setOrderStatus(item.orderStatus)
          setPaymentStatus(item.paymentStatus)
          console.log(OrderStatus,PaymentStatus);

          var response = await fetch("/user/admin/" + item.userId,{
            method:"get",
            headers:{"content-type":"application/json",
            "authorization": localStorage.getItem("token")},
          })
          response = await response.json()
           if (response.result==="Done") {
              setUser(response.data)
           }
      }}
      function updateOrder() {
        dispatch(UpdateCheckoutAction({...Checkouts, orderStatus:OrderStatus, paymentStatus:PaymentStatus}))
        setCheckouts((old)=>{
          return{...old, 
            ["orderStatus"]:OrderStatus,
            ["paymentStatus"]:PaymentStatus
        }})
      }

      function getData(e) {
        if (e.target.name==="orderStatus") {
          setOrderStatus(e.target.value)
        }else{
          setPaymentStatus(e.target.value)
        }
      }

     useEffect(() => {
      GetApiData()
     }, [allCheckouts.length]);

  return (
    <>
       <div className='container-fluid '>
    <div className="row">
    <div className="col-sm-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-xl-10 mt-5">
      <h5 className='bg-primary text-center text-light p-1'>Single Checkout</h5>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>User Id</div>
                <div className='border  p-3 w-50'>{User._id}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>User Name</div>
                <div className='border  p-3 w-50'>{User.name}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Email</div>
                <div className='border  p-3 w-50'>{User.email}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Phone</div>
                <div className='border  p-3 w-50'>{User.phone}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>User Address/Billing Address</div>
                <div className='border  p-3 w-50'>
                {`${User.addressline1}, ${User.addressline2}, ${User.addressline3}`}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Payment Mode</div>
                <div className='border  p-3 w-50'>{Checkouts.paymentMode}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Payment Status</div>
                <div className='border  p-3 w-50'>{Checkouts.paymentStatus}
                {Checkouts.paymentStatus!=="Done" ? 
                   <select name="paymentStatus" className="form-control mt-2 w-50" onChange={getData}>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                   </select>
                   : "" }
                </div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Order Status</div>
                <div className='border  p-3 w-50'>{Checkouts.orderStatus}
                {Checkouts.orderStatus!=="Delivered" ? 
                   <select name="orderStatus" className="form-control mt-2 w-50" onChange={getData}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packed">Packed</option>
                    <option value="Ready To Ship">Ready To Ship</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                   </select>
                   : "" }</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Total Amount</div>
                <div className='border  p-3 w-50'>{Checkouts.totalAmount}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Shipping Amount</div>
                <div className='border  p-3 w-50'>{Checkouts.shippingAmount}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Final Amount</div>
                <div className='border  p-3 w-50'>{Checkouts.finalAmount}</div>
              </div>
              <div className='d-flex'>
                <div className='border  p-3 w-50'>Date</div>
                <div className='border  p-3 w-50'>{Checkouts.date}</div>
              </div>
              <div className='mt-5'>
                <button onClick={updateOrder} className='btn btn-primary text-light w-100'>Update</button>
              </div>

             <table className="table table-bordered text-center mt-5">
            <thead className="bg-secondary text-dark">
            <tr>
            <th>Products</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Final</th>
            </tr>
            </thead>
            <tbody className="align-middle">
           {Checkouts.products && Checkouts.products.map((elem,index)=>{
            return  <tr key={index}>
            <td className="align-middle"><img src={`/public/products/${elem.pic}`} alt="" style={{ width: "50px" }} /> {elem.name}</td>
            <td className="align-middle">{elem.color}</td>
            <td className="align-middle">{elem.size}</td>
            <td className="align-middle">&#8377;{elem.price}</td>
            <td className="align-middle">{elem.qty}</td>
            <td className="align-middle">&#8377;{elem.total}</td>           
            </tr>
            })}
            </tbody>
            </table>
              </div>
         </div>
</div>

    </>
  )
}

export default AdminSingleCheckout
