import React, { useState, useEffect} from 'react'
import LeftNav from './LeftNav'
import { useParams, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {UpdateMaincategoryAction, GetMaincategoryAction} from "../../Store/Actions/MaincategoryAction"

const AdminUpdateMaincategory = () => {
    var {_id} = useParams()
    var navigate = useNavigate()
    var [message, setMessage] = useState(false)
    var dispatch = useDispatch()
     const [name, setname] = useState("");
     var allMaincategories = useSelector((state)=> state.MaincategoryStateData)
      
    function changeHandler(e) {
        setname(e.target.value)
    } 

    function postData(e) {
        e.preventDefault()
         if (allMaincategories.length) {
             var item = allMaincategories.find((item)=> item.name === name)
             if (item) {
                setMessage("Maincategory Name Already Exist")
             }else{  
                dispatch(UpdateMaincategoryAction({_id,name}))
                navigate("/admin-maincategories")
             }
         }
    }

useEffect(() => {
    dispatch(GetMaincategoryAction())
    var item = allMaincategories.find((item) => item._id === _id)
    if(item){
    setname(item.name)
    }
}, [allMaincategories.length]);

    return (
        <>

            
<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-md-9 col-xl-10  mt-5">
                    <h5 className='bg-primary text-center text-light p-1'>Maincategory</h5>
                    <form className='p-3' onSubmit={postData}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Maincategory Name : ' className='form-control' 
                             onChange={changeHandler} value={name !== undefined ? name : ""}/>
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

export default AdminUpdateMaincategory
