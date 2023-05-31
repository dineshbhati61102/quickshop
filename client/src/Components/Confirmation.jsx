import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
  return (
  <>
  

    <div className='container-fluid text-center my-5'>
        <div className="row">
          <div className="col-md-12 text-center">
            <span className="icon-check_circle display-3 text-success"></span>
            <h2 className="display-4 text-black">Thank you!</h2>
            <p className="lead">Your Order Has Been Placed!!!</p>
            <p className="lead">Now You Can Track Your Order in Profile Page</p>
            <Link className='btn btn-primary text-light mt-3' to="/shop">Continue Shopping</Link>
          </div>
        </div>
      </div>

    </>
  )
}
