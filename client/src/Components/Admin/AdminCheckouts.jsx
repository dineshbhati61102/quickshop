import React, {useEffect,useState} from 'react'
import LeftNav from './LeftNav'
import {useDispatch,useSelector} from "react-redux"
import {GetCheckoutAction} from "../../Store/Actions/CheckoutAction"
import { Link } from 'react-router-dom'

const AdminCheckouts = () => {
  var allCheckouts = useSelector((state)=> state.CheckoutStateData)
  const [Checkout, setCheckout] = useState([]);
  var dispatch = useDispatch()

  function getApiData() {
     dispatch(GetCheckoutAction())
     if (allCheckouts.length) {
      setCheckout(allCheckouts)
     }
  }

useEffect(() => {
  getApiData()
}, [allCheckouts.length]);
  return (
    <>
       <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-xl-10 mt-3 table-responsive">
        <h2 className='text-center text-primary'>Checkouts</h2>
      <table className='table table-bordered'>
        <thead className='bg-primary text-light'>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>Payment Mode</th>
            <th>Payment Status</th>
            <th>Total Amount</th>
            <th>Shipping Amount</th>
            <th>Final Amount</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>   
        <tbody>
       {Checkout.map((elem, index)=>{
         return  <tr key={index}>
                  <td>{elem._id}</td>
                  <td>{elem.userId}</td>
                  <td>{elem.paymentMode}</td>
                  <td>{elem.paymentStatus}</td>
                  <td>{elem.totalAmount}</td>
                  <td>{elem.shippingAmount}</td>    
                  <td>{elem.finalAmount}</td>
                  <td>{elem.date}</td>
                  <td><Link className='btn btn-primary text-light' to={`/admin-single-checkout/${elem._id}`}>View</Link></td>       
             </tr>
      })  }
         </tbody>
      </table>
       </div>
      </div>
      </div>
    </>
  )
}

export default AdminCheckouts
