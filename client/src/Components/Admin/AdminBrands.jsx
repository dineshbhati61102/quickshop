import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'
import {useDispatch,useSelector} from "react-redux"
import {GetBrandAction, DeleteBrandAction} from "../../Store/Actions/BrandAction"

const AdminBrands = () => {
    const [message, setMessage] = useState(false);
    const [Brand, setBrand] = useState([]);
    var dispatch = useDispatch()
    var allBrands = useSelector((state)=> state.BrandStateData)

   function getApiData() {
    dispatch(GetBrandAction())
       if (allBrands.length) {
         setBrand(allBrands)
       }
   }

      function deleteBrand(_id) {
        dispatch(DeleteBrandAction({_id}))
        if (allBrands.length<=0) {
          setMessage("All Record is Deleted")
        }
      }

useEffect(() => {
  getApiData()
}, [allBrands.length]);
  return (
    <>
    <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-2 table-responsive">
        <h2 className='text-center text-primary'>Brands</h2>
       <Link to="/admin-add-brand" className='btn btn-primary text-light py-2 px-3 mb-2'>Add New</Link>   
      <table className='table table-bordered'>
        <thead className='bg-primary text-light'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>   
        <tbody>
       { message ? <tr><td colSpan='4'><p className='alert alert-danger text-center'>{message}</p></td></tr>
       : Brand.map((elem, index)=>{
         return  <tr key={index}>
            <td>{elem._id}</td>
            <td>{elem.name}</td>
            <td> <Link to={`/admin-update-brand/${elem._id}`} className='btn btn-primary text-light py-2 px-3 mb-2'>Update</Link></td>
            <td> <button  onClick={()=>deleteBrand(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
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

export default AdminBrands
