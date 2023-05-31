import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import {useDispatch,useSelector} from "react-redux"
import {GetProductAction, DeleteProductAction} from "../../Store/Actions/ProductAction"

const AdminProducts = () => {
  var dispatch = useDispatch()
  const [Product, setProduct] = useState([]);
  var allProducts = useSelector((state)=> state.ProductStateData)

    function getApiData() {
      dispatch(GetProductAction())
      if (allProducts.length) {
        setProduct(allProducts)
      }
    }

       function deleteProduct(_id) {
         dispatch(DeleteProductAction({_id}))
         getApiData()
       }


useEffect(() => {
  getApiData()
}, [allProducts]);
  return (
    <>
       <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-2 table-responsive">
        <h2 className='text-center text-primary'>Products</h2>
        <Link to="/admin-add-product" className='btn btn-primary text-light py-2 px-3 mb-2'>Add New</Link>
      <table className='table table-bordered'>
        <thead className='bg-primary text-light'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Maincategory</th>
            <th>Subcategory</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Size</th>
            <th>Base Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Stock</th>
            <th>Pic1</th>
            <th>Pic2</th>
            <th>Pic3</th>
            <th>Pic4</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>   
        <tbody>
        { Product.map((elem, index)=>{
         return  <tr key={index}>
                  <td>{elem._id}</td>
                  <td>{elem.name}</td>
                  <td>{elem.maincategory}</td>
                  <td>{elem.subcategory}</td>
                  <td>{elem.brand}</td>
                  <td>{elem.color}</td>    
                  <td>{elem.size}</td>
                  <td>{elem.baseprice}</td>
                  <td>{elem.discount}</td>
                  <td>{elem.finalprice}</td>
                  <td>{elem.stock}</td>
                  <td><img src={`/public/products/${elem.pic1}`} alt={`${elem.name} image`} style={{width:'50px', height:'50px'}} /></td>
                  <td><img src={`/public/products/${elem.pic2}`} alt={`${elem.name} image`} style={{width:'50px', height:'50px'}} /></td>
                  <td><img src={`/public/products/${elem.pic3}`} alt={`${elem.name} image`} style={{width:'50px', height:'50px'}} /></td>
                  <td><img src={`/public/products/${elem.pic4}`} alt={`${elem.name} image`} style={{width:'50px', height:'50px'}} /></td>
                  <td> <Link to={`/admin-update-product/${elem._id}`} className='btn btn-primary text-light py-2 px-3 mb-2'>Update</Link></td>
                  <td> <button onClick={() => deleteProduct(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
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

export default AdminProducts
