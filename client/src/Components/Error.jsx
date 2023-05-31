import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <>
     <div className='row m-0'>
     <div className='col-12 text-center'>
    <h1 className='text-danger'> 404 Error: Page not found </h1>
      <p className='text-danger'>The requested URL was not found on this server.</p>
      <Link className='btn btn-primary text-light' to="/">Go To Home Page</Link>
      </div>
      </div>
    </>
  )
}

export default Error
