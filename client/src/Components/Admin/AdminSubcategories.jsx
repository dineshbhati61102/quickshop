import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from "react-redux"
import { GetSubcategoryAction, DeleteSubcategoryAction } from "../../Store/Actions/SubcategoryAction"

const AdminSubcategories = () => {
  var [message, setMessage] = useState(false)
  const [Subcategories, setSubcategories] = useState([]);
  var dispatch = useDispatch()
  var allSubcategories = useSelector((state) => state.SubcategoryStateData)

  function getApiData() {
    dispatch(GetSubcategoryAction())
    if (allSubcategories.length) {
      setSubcategories(allSubcategories)
    }
  }
   
   function deleteSubcategory(_id) {
      dispatch(DeleteSubcategoryAction({_id}))
      if (!allSubcategories.length) {
         setMessage("All Record is Deleted")
      }
   }

  useEffect(() => {
    getApiData()
  }, [allSubcategories.length]);

  return (
    <>
         <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-2 table-responsive">
          <h2 className='text-center text-primary'>Subcategories</h2>
          <Link to="/admin-add-subcategory" className='btn btn-primary text-light py-2 px-3 mb-2'>Add New</Link>
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
              {message ? <tr><td colSpan="4"><p className='alert alert-danger text-center'>{message}</p></td></tr>
                : Subcategories && Subcategories.map((elem, index) => {
                  return <tr key={index}>
                    <td>{elem._id}</td>
                    <td>{elem.name}</td>
                    <td> <Link to={`/admin-update-subcategory/${elem._id}`} className='btn btn-primary text-light py-2 px-3 mb-2'>Update</Link></td>
                    <td> <button onClick={()=>deleteSubcategory(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  )
}

export default AdminSubcategories
