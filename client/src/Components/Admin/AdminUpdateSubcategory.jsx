import React, { useState, useEffect } from "react";
import LeftNav from './LeftNav'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateSubcategoryAction, GetSubcategoryAction } from '../../Store/Actions/SubcategoryAction'
const AdminUpdateSubcategory = () => {
    var {_id} = useParams()
      const [name, setname] = useState("");
      const [message, setMessage] = useState(false);
      var dispatch = useDispatch()
      var navigate = useNavigate()
      var allSubcategories = useSelector((state)=> state.SubcategoryStateData)

      function changeHandler(e) {
        setname(e.target.value)
      }
       function postData(e) {
           e.preventDefault()
           if (allSubcategories.length) {
              var item = allSubcategories.find((item)=> item.name === name)
              if (item) {
                setMessage("Subcategory Name Already Exist")
              }else{
                dispatch(UpdateSubcategoryAction({_id,name}))
                navigate("/admin-subcategories")
              }
           }

       }

useEffect(() => {
    dispatch(GetSubcategoryAction())
    var item = allSubcategories.find((item)=> item._id === _id)
    if (item) {
        setname(item.name)
    }
}, [allSubcategories.length]);

    return (
        <>

       
<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-md-9 col-xl-10 mt-5">
                    <h5 className='bg-primary text-center text-light p-1'>Subcategory</h5>
                    <form className='p-3' onSubmit={postData}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Subcategory Name : ' className='form-control' 
                            onChange={changeHandler} value={name !== undefined ? name : ""} />
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

export default AdminUpdateSubcategory
