import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { DeleteCartAction, GetCartAction } from "../Store/Actions/CartAction"
import {CreateCheckoutAction } from "../Store/Actions/CheckoutAction"

const Checkout = () => {
    var navigate = useNavigate()
    var dispatch = useDispatch()
    var allCarts = useSelector((state) => state.CartStateData)
    const [PaymentMode, setPaymentMode] = useState("COD");
    const [Carts, setCarts] = useState([]);
    const [User, setUser] = useState({});
    const [Total, setTotal] = useState(0);
    const [Shipping, setShipping] = useState(0);
    const [Final, setFinal] = useState(0);

   function GetPaymentMode(e) {
      setPaymentMode(e.target.value)
    }
    
    function PlaceOrder() {
        var item = {
            userId: localStorage.getItem("UserId"),
            paymentMode: PaymentMode,
            orderStatus: "Order Placed",
            paymentStatus: "Pending",
            time: new Date(),
            totalAmount: Total,
            shippingAmount: Shipping,
            finalAmount: Final,
            products: Carts
        }
        dispatch(CreateCheckoutAction(item))

        for (let item of Carts) {
            dispatch(DeleteCartAction({ _id: item._id }))
        }

        if (PaymentMode === "COD") {
            navigate("/confirmation")
        }else{
            navigate("/payment/-1")
        }
    }

    async function getApiData() {
        var response = await fetch("/user/" + localStorage.getItem("UserId"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        if (response.result === "Done") {
            setUser(response.data[0])
        } else {
            navigate("/login")
        }
        dispatch(GetCartAction())
        if (allCarts.length) {
            setCarts(allCarts)
            var total = 0
            var shipping = 0
            var final = 0
            for (let item of allCarts) {
                total = total + item.total
            }
            if (total > 0 && total <= 500) {
                shipping = 150
            }
            final = total + shipping
            setTotal(total)
            setShipping(shipping)
            setFinal(final)
        }
        
    }

    useEffect(() => {
        getApiData()
    }, [allCarts.length]);

    return (
        <>

            {/* <!-- Checkout Start --> */}

            <div className="container-fluid pt-5 mt-1">
                <div className="row ">
                    <div className="col-lg-12">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0 text-center">Billing Details</h4>
                        </div>
                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>Name</div>
                            <div className='border  p-3 w-50'>{User.name}</div>
                        </div>
                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>User Name</div>
                            <div className='border  p-3 w-50'>{User.username}</div>
                        </div>
                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>Email</div>
                            <div className='border  p-3 w-50'>{User.email}</div>
                        </div>
                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>Phone</div>
                            <div className='border  p-3 w-50'>{User.phone}</div>
                        </div>

                        <div className='d-flex checkout_data'>
                            <div className='border  p-4 w-50'>BillinG Address</div>
                            <div className='border  p-3 w-50'>
                                {User.addressline1}, {User.addressline2}, {User.addressline3}</div>
                        </div>

                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>Pin</div>
                            <div className='border  p-3 w-50'>{User.pin}</div>
                        </div>

                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>City</div>
                            <div className='border  p-3 w-50'>{User.city}</div>
                        </div>

                        <div className='d-flex checkout_data'>
                            <div className='border  p-3 w-50'>State</div>
                            <div className='border  p-3 w-50'>{User.state}</div>
                        </div>
                        <div className='mt-5 checkout_btn'>
                            <Link to={`/update-profile/${User._id}`} className='btn btn-primary text-light w-100'>Update Profile</Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-12">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="text-center font-weight-semi-bold m-0">Cart Details</h4>
                        </div>
                        <div className="table-responsive-md">
                            <table className="table table-bordered">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>Product</th>
                                        <th>Color/Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Carts.map((elem, index) => {
                                        return <tr key={index} className="text-center">
                                            <td className="image-prod"><img src={`/public/products/${elem.pic}`} height="30px" width="30px" className='rounded float-left' alt="" />{elem.name}</td>
                                            <td className="product-name">{elem.color}/{elem.size}</td>
                                            <td className="price">&#8377;{elem.price}</td>
                                            <td className="price">{elem.qty}</td>
                                            <td className="total">&#8377;{elem.total}</td>

                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className='row mt-5'>
                    <div className='col-lg-6'>
                        <div className="card-header bg-secondary border-0">
                            <h4 className="text-center font-weight-semi-bold m-0">Cart Total</h4>
                        </div>

                        <div className='d-flex'>
                            <div className='border  p-3 w-50'>Subtotal</div>
                            <div className='border  p-3 w-50'>{Total}</div>
                        </div>

                        <div className='d-flex'>
                            <div className='border  p-3 w-50'>Delivery Charge</div>
                            <div className='border  p-3 w-50'>{Shipping}</div>
                        </div>

                        <div className='d-flex'>
                            <div className='border  p-3 w-50'>Final Amount</div>
                            <div className='border  p-3 w-50'>{Final}</div>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="text-center font-weight-semi-bold m-0">Payment Details</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" onChange={GetPaymentMode} className="custom-control-input" name="paymentMode" 
                                            value="OnlinePayment" id='onlinePaymentMode'
                                        />
                                        <label className="custom-control-label" htmlFor="onlinePaymentMode">Upi/Netbankig</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" onChange={GetPaymentMode} className="custom-control-input" name="paymentMode" id='codPaymentMode'
                                            value="COD" checked
                                        />
                                        <label className="custom-control-label" htmlFor="codPaymentMode">Cash On Delivery</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
                <button onClick={PlaceOrder} className="btn btn-lg btn-block btn-primary text-light font-weight-bold my-3">Place Your Order</button>
            </div>
            {/* <!-- Checkout End -->  */}
        </>
    )
}

export default Checkout
