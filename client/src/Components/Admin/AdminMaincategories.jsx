import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from "react-redux"
import { GetMaincategoryAction, DeleteMaincategoryAction } from "../../Store/Actions/MaincategoryAction"

const AdminMaincategories = () => {
  const [message, setMessage] = useState(false);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(6);
  const [Maincategories, setMaincategories] = useState([]);
  const dispatch = useDispatch();
  var allMaincategories = useSelector(state => state.MaincategoryStateData);


  function getApiData() {
    dispatch(GetMaincategoryAction({Page, PageSize}))
    if (allMaincategories.length) {
      setMaincategories(allMaincategories)
    }
  }

  function deleteMaincategory(_id) {
    dispatch(DeleteMaincategoryAction({_id }))
    if (allMaincategories.length<=0) {
      setMessage("All Record is Deleted")
    }

  }

  function HandleScroll() {
    const {scrollY, innerHeight} = window
    const {scrollHeight} = document.body
    if (scrollY + innerHeight >= scrollHeight - 500) {
      setPage((Page)=> Page + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", HandleScroll)
    return () => {
      window.removeEventListener("scroll", HandleScroll)
    };
  }, []);

  useEffect(() => {
    getApiData()
  }, [allMaincategories.length])

  return (
    <>
        <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-2 table-responsive">
          <h2 className='text-center text-primary'>Maincategories</h2>
          <Link to="/admin-add-maincategory" className='btn btn-primary text-light py-2 px-3 mb-2'>Add New</Link>
         
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
             { message ? <tr><td colSpan="4"><p className='alert alert-danger text-center'>{message}</p></td></tr> 
            : Maincategories.slice(0, Page * PageSize).map((elem, index) => {
                  return <tr key={index}>
                    <td>{elem._id}</td>
                    <td>{elem.name}</td>
                    <td> <Link to={`/admin-update-maincategory/${elem._id}`} className='btn btn-primary text-light py-2 px-3 mb-2'>Update</Link></td>
                    <td> <button onClick={() => deleteMaincategory(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
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

      export default AdminMaincategories
