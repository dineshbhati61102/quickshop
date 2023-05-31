import React, {useEffect, useState} from 'react'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from 'react-redux'
import { CreateMaincategoryAction, GetMaincategoryAction } from '../../Store/Actions/MaincategoryAction'
import { useNavigate } from 'react-router-dom'

const AdminAddMaincategory = () => {
    const [message, setMessage] = useState("");
    var navigate = useNavigate()
       const [name, setname] = useState("");
        var dispatch = useDispatch()
        var allMaincategories = useSelector((state)=> state.MaincategoryStateData)

         function changeHandler(e) {
            setname(e.target.value)
         }
          function postData(e) {
            e.preventDefault();
            const trimmedName = name.replace(/\s+/g, ' ').trim();
            if (trimmedName === '') {
              setMessage('Enter Maincategory Name');
            }else if (allMaincategories.length) {
              const item = allMaincategories.find((item) => item.name === trimmedName);
              if (item) {
                setMessage('Maincategory Name Already Exist');
              } else {
                dispatch(CreateMaincategoryAction({ name: trimmedName }));
                navigate('/admin-maincategories');
              }
            } else {
              dispatch(CreateMaincategoryAction({ name: trimmedName }));
              navigate('/admin-maincategories');
            }
            }

   useEffect(()=>{
     dispatch(GetMaincategoryAction())
   },[allMaincategories.length])
  
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
                            onChange={changeHandler} value={name} />
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

export default AdminAddMaincategory
