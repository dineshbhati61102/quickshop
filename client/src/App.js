import React from 'react'
import './App.css';
import "./style.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from "./Components/Footer"
import Navbar from './Components/Navbar';
import Error from './Components/Error';
import Home from './Components/Home';
import About from './Components/About';
import ProductDetails from './Components/ProductDetails';
import ContactUs from './Components/ContactUs';
import Cart from './Components/Cart';
import Search from './Components/Search';
import Wishlist from './Components/Wishlist';
import Checkout from './Components/Checkout';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from "./Components/Profile"
import ForgetPassword1 from './Components/ForgetPassword1';
import ForgetPassword2 from './Components/ForgetPassword2';
import ForgetPassword3 from './Components/ForgetPassword3';
import AdminHome from './Components/Admin/AdminHome';
import AdminSingleContact from './Components/Admin/AdminSingleContact';
import UpdateProfile from './Components/UpdateProfile';
import AdminAddMaincategory from './Components/Admin/AdminAddMaincategory';
import AdminUpdateMaincategory from './Components/Admin/AdminUpdateMaincategory';
import AdminAddSubcategory from './Components/Admin/AdminAddSubcategory';
import AdminUpdateSubcategory from './Components/Admin/AdminUpdateSubcategory';
import AdminAddBrand from './Components/Admin/AdminAddBrand';
import AdminUpdateBrand from './Components/Admin/AdminUpdateBrand';
import AdminAddProduct from './Components/Admin/AdminAddProduct';
import AdminUpdateProduct from './Components/Admin/AdminUpdateProduct';
import Confirmation from './Components/Confirmation';
import Payment from './Components/Payment';
import AdminSingleCheckout from './Components/Admin/AdminSingleCheckout';


const AdminUsers = React.lazy(() => import('./Components/Admin/AdminUsers'));
const AdminContacts = React.lazy(() => import('./Components/Admin/AdminContacts'));
const Shop = React.lazy(() => import('./Components/Shop'));
const AdminMaincategories = React.lazy(() => import('./Components/Admin/AdminMaincategories'));
const AdminSubcategories = React.lazy(() => import('./Components/Admin/AdminSubcategories'));
const AdminBrands = React.lazy(() => import('./Components/Admin/AdminBrands'));
const AdminProducts = React.lazy(() => import('./Components/Admin/AdminProducts'));
const AdminNewsletters = React.lazy(() => import('./Components/Admin/AdminNewsletters'));
const AdminCheckouts = React.lazy(() => import('./Components/Admin/AdminCheckouts'));

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

              <Route path='/admin-home' element={<AdminHome />} />
              <Route path='/admin-users' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminUsers /></React.Suspense>} />
              <Route path='/admin-contacts' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminContacts /></React.Suspense>} />
              <Route path='/admin-single-contact/:_id' element={<AdminSingleContact />} />
              <Route path='/admin-maincategories' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminMaincategories /></React.Suspense>} />
              <Route path='/admin-add-maincategory' element={<AdminAddMaincategory />} />
              <Route path='/admin-update-maincategory/:_id' element={<AdminUpdateMaincategory />} />
              <Route path='/admin-subcategories' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminSubcategories /></React.Suspense>} />
              <Route path='/admin-add-subcategory' element={<AdminAddSubcategory />} />
              <Route path='/admin-update-subcategory/:_id' element={<AdminUpdateSubcategory />} />
              <Route path='/admin-brands' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminBrands /></React.Suspense>} />
              <Route path='/admin-add-brand' element={<AdminAddBrand />} />
              <Route path='/admin-update-brand/:_id' element={<AdminUpdateBrand />} />
              <Route path='/admin-products' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminProducts /></React.Suspense>} />
              <Route path='/admin-add-product' element={<AdminAddProduct />} />
              <Route path='/admin-update-product/:_id' element={<AdminUpdateProduct />} />
              <Route path='/admin-newsletters' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminNewsletters /></React.Suspense>} />
              <Route path='/admin-checkouts' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><AdminCheckouts /></React.Suspense>} />
              <Route path='/admin-single-checkout/:_id' element={<AdminSingleCheckout/>} />
          

          
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/payment/:_id' element={<Payment />} />


          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><Shop /></React.Suspense>} />
          <Route path='/product-details/:_id' element={<ProductDetails />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget-password-1' element={<ForgetPassword1 />} />
          <Route path='/forget-password-2' element={<ForgetPassword2 />} />
          <Route path='/forget-password-3' element={<ForgetPassword3 />} />
          <Route path='/update-profile/:_id' element={<UpdateProfile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search-results' element={<Search />} />






          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<React.Suspense fallback={<div className='text-center'>Loading...</div>}><Shop /></React.Suspense>} />
          <Route path='/product-details/:_id' element={<ProductDetails />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget-password-1' element={<ForgetPassword1 />} />
          <Route path='/forget-password-2' element={<ForgetPassword2 />} />
          <Route path='/forget-password-3' element={<ForgetPassword3 />} />
          <Route path='/update-profile/:_id' element={<UpdateProfile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search-results' element={<Search />} />

          <Route path='*' element={<Error />}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App