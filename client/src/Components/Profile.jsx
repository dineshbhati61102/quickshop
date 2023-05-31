import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { GetCheckoutUserAction } from '../Store/Actions/CheckoutAction';

const Profile = () => {
  var [User, setUser] = useState({});
  const [Order, setOrder] = useState([]);
  var navigate = useNavigate()
  var dispatch = useDispatch()
  var allCheckouts = useSelector((state)=> state.CheckoutStateData)

  async function getApiData() {
       dispatch(GetCheckoutUserAction())
       var response = await fetch("/user/" + localStorage.getItem("UserId"),{
        method:"get",
        headers:{"content-type":"application/json",
      "authorization":localStorage.getItem("token")
    }})
       response = await response.json()
       if (response.result === "Done") {
         setUser(response.data[0])
       }else{
        navigate("/login")
       }
      if (allCheckouts.length) {
         setOrder(allCheckouts)
      }
  } 
      
  useEffect(() => {
    getApiData()
  }, [allCheckouts.length]); 

  return (
    <>
     <div className="container-fluid">
        <div className='row justify-content-center mt-5' >
          <h2 className='text-center mt-1 mb-4 text-primary'>User Profile</h2>
        <div className='col-sm-3  p-1'>
         <img src={`/public/users/${User.pic}`} alt={`${User.name} Image`} className='img-fluid user_img'
         style={{borderRadius:"50%", border:"5px solid grey"}} />

        </div>

            <div className='ml-5 col-sm-8  user_home'>
              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Name</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.name}</div>
              </div>
              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>User Name</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.username}</div>
              </div>
              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Email</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.email}</div>
              </div>
              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Phone</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.phone}</div>
              </div>
              
              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Addressline1</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.addressline1}</div>
              </div>

              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Addressline2</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.addressline2}</div>
              </div>

              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Addressline3</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.addressline3}</div>
              </div>

              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border py-3'>Pin</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border py-3'>{User.pin}</div>
              </div>

              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>City</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.city}</div>
              </div>

              <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>State</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.state}</div>
              </div>
              <div className='mt-5'>
                <Link to={`/update-profile/${User._id}`} className='btn btn-primary text-light w-100'>Update Profile</Link>
              </div>
              <div>
              </div>
            </div>
          </div>

          <div className="bg-secondary border-0 py-3 my-5 mb-5">
                <h4 className="text-center font-weight-semi-bold m-0">Order History Section</h4>
                 </div>
              { Order.map((elem, index) => {
                return  <div className="row mt-5 mx-0" key={index}>
             <div className="col-lg-6">
                        <div className="table-responsive-md">
                            <table className="table table-bordered">
                            <tbody className='text-center'>
                                    <tr>
                                        <th>Order ID</th>
                                            <td>{elem._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>{elem.paymentMode}</td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>{elem.orderStatus}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td>{elem.paymentStatus}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Amount</th>
                                            <td>&#8377;{elem.totalAmount}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping Amount</th>
                                            <td>&#8377;{elem.shippingAmount}</td>
                                        </tr>
                                        <tr>
                                            <th>Final Amount</th>
                                            <td>&#8377;{elem.finalAmount}</td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>{elem.date}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="table-responsive-md">
                            <table className="table table-bordered">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                    <th>Product</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elem.products.map((elem, index) => {
                                        return <tr key={index}>
                                  <td className="image-prod"><img src={`/public/products/${elem.pic}`} height="75px" width="75px" className='rounded float-left' alt="" />{elem.name}</td>
                                      <td>{elem.color}</td>
                                      <td>{elem.size}</td>
                                      <td>&#8377;{elem.price}</td>
                                      <td>{elem.qty}</td>
                                      <td>&#8377;{elem.total}</td>

                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                  
                </div>
          </div>
                  })
                  }
</div>


    </>
  )
}

export default Profile
