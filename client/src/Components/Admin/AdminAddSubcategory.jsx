import React, { useEffect, useState } from 'react'
import LeftNav from './LeftNav'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CreateSubcategoryAction, GetSubcategoryAction } from '../../Store/Actions/SubcategoryAction'


const AdminAddSubcategory = () => {
    const [message, setMessage] = useState(false)
    const [name, setname] = useState("");
    var dispatch = useDispatch()
    var allSubcategories = useSelector((state) => state.SubcategoryStateData)
    var navigate = useNavigate()

    function changeHandler(e) {
        setname(e.target.value)
    }
    function postData(e) {
        e.preventDefault()
        const trimmedName = name.replace(/\s+/g, ' ').trim();
        if (trimmedName === '') {
          setMessage('Enter Subcategory Name');
        }else if (allSubcategories.length) {
            const item = allSubcategories.find((item)=> item.name === trimmedName)
            if (item) {
            setMessage("Subcategory Name Already Exist")
            }else{
              dispatch(CreateSubcategoryAction({name: trimmedName}))
                navigate("/admin-subcategories")
            }
        }else{
            navigate("/admin-subcategories")
         dispatch(CreateSubcategoryAction({name: trimmedName}))

        }
    }

    useEffect(() => {
        dispatch(GetSubcategoryAction())
    }, [allSubcategories.length]);

    return (
        <>
          <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5 ">
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
                            <button type='submit' className='btn btn-primary text-light px-4'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminAddSubcategory
