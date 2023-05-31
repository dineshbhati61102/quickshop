import React, { useState, useEffect } from 'react'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from 'react-redux';
import {GetBrandAction,CreateBrandAction} from "../../Store/Actions/BrandAction"
import { useNavigate } from 'react-router-dom';

const AdminAddBrand = () => {
    const [name, setname] = useState("");
    const [message, setMessage] = useState(false);
    var dispatch = useDispatch()
    var navigate = useNavigate()
    var allBrands = useSelector((state)=> state.BrandStateData)

    function changeHandler(e) {
        setname(e.target.value)
    }

     function postData(e) {
        e.preventDefault()
        const trimmedName = name.replace(/\s+/g, ' ').trim();
            if (trimmedName === '') {
              setMessage('Enter Maincategory Name');
            } else  if (allBrands.length) {
            var item = allBrands.find((item)=> item.name === trimmedName)
            if (item) {
                setMessage("Brand Name Already Exist")
            }else{
                dispatch(CreateBrandAction({name:trimmedName}))
              navigate("/admin-brands")
            }
        }else{
            dispatch(CreateBrandAction({name:trimmedName}))
            navigate("/admin-brands")
        }
     }

useEffect(() => {
    dispatch(GetBrandAction())
}, [allBrands.length]);
    return (
        <>

<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5 ">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-md-9 col-xl-10 mt-5 ">
                    <h5 className='bg-primary text-center text-light p-1'>Brand</h5>
                    <form className='p-3' onSubmit={postData}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Brand Name : ' className='form-control' 
                             onChange={changeHandler} value={name !== undefined ? name : ""} />
                        </div>
                        { message ? <p className='text-danger w-25'>{message}</p> : ""}
                        <div className="mb-3">
                            <button type='submit' className='btn btn-primary text-light px-4'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminAddBrand
