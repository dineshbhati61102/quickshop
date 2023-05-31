import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {GetBrandAction, UpdateBrandAction} from "../../Store/Actions/BrandAction"
import LeftNav from './LeftNav'

const AdminUpdateBrand = () => {
      const [name, setname] = useState("");
      const [message, setMessage] = useState(false);
      var navigate = useNavigate()
      var dispatch = useDispatch()
      var {_id} = useParams()
      var allBrands = useSelector((state)=> state.BrandStateData)

      function changeHandler(e) {
         setname(e.target.value)
      }
 
       function postData(e) {
          e.preventDefault()
          if (allBrands.length) {
             var item = allBrands.find((item)=> item.name === name)
             if (item) {
             setMessage("Brand Name Already Exist")
             }else{
                dispatch(UpdateBrandAction({_id, name}))
                navigate("/admin-brands")
             }
          }
       }
       
   useEffect(() => {
     dispatch(GetBrandAction())
     var item = allBrands.find((item)=>item._id === _id)
     if (item) {
        setname(item.name)
     }
   }, [allBrands.length]);   
    return (
        <>

<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-md-9 col-xl-10  mt-5">
                    <h5 className='bg-primary text-center text-light p-1'>Brand</h5>
                    <form className='p-3' onSubmit={postData}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Brand Name : ' className='form-control' 
                            onChange={changeHandler} value={name !== undefined ? name:""} />
                        </div>
                        { message ? <p className='text-danger w-25'>{message}</p> : ""}
                        <div className="mb-3">
                            <button type='submit' className='btn btn-primary text-light px-4'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminUpdateBrand
