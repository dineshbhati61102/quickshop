import React from 'react'
import { Link } from 'react-router-dom'


const LeftNav = () => {
  return (
    <>
    <div className='container-fluid'>
    <div className="navbar navbar-expand-sm bg-light navbar-light">
    <button type="button"  className="navbar-toggler" data-toggle="collapse" data-target="#navbarTogglerDemo01">
   <span className="navbar-toggler-icon"></span> <span>Admin Menu</span> 
      </button>
     
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
     <div className="d-sm-inline-block bg-primary text-center mt-3">
                    <Link to="/admin-home" className="nav-link text-light active">Home</Link>
                    <Link to="/admin-users" className="nav-link text-light ">Users</Link>
                    <Link to="/admin-maincategories" className="nav-link text-light">Maincategories</Link>
                    <Link to="/admin-subcategories" className="nav-link text-light">Subcategories</Link>
                    <Link to="/admin-brands" className="nav-link text-light">Brands</Link>
                    <Link to="/admin-products" className="nav-link text-light">Products</Link>
                    <Link to="/admin-contacts" className="nav-link text-light">Contact</Link>
                    <Link to="/admin-newsletters" className="nav-link text-light">Newsletters</Link>
                    <Link to="/admin-checkouts" className="nav-link text-light">Checkouts</Link>
</div>
</div>
</div>

</div>
    </>
  )
}

export default LeftNav
