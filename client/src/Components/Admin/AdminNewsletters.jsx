import React, { useEffect, useState } from 'react'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from "react-redux"
import { GetNewsletterAction, DeleteNewsletterAction } from "../../Store/Actions/NewsletterAction"

const AdminNewsletters = () => {
  const [Message, setMessage] = useState(false);
   const [Page, setPage] = useState(1);
   const [PageSize, setPageSize] = useState(6);
  const [Newsletter, setNewsletter] = useState([]);
  var dispatch = useDispatch()
  var allNewsletters = useSelector((state) => state.NewsletterStateData)

  function getApiData() {
    dispatch(GetNewsletterAction({Page, PageSize}))
    if (allNewsletters.length) {
      setNewsletter(allNewsletters)
    }
  }

  function deleteNewsletter(_id) {
    dispatch(DeleteNewsletterAction({ _id }))
    if (!allNewsletters.length) {
      setMessage("All Record is Deleted")
    }
  }

  function handleScroll(){
    const {scrollY, innerHeight} =  window
    const {scrollHeight} = document.body
    if (scrollY + innerHeight >= scrollHeight - 500) {
      setPage((Page)=> Page + 1)
    }
  }


  useEffect(() => {
    getApiData()
  }, [allNewsletters.length, Page, PageSize]);

useEffect(() => {
  window.addEventListener("scroll", handleScroll)

  return () => {
    window.removeEventListener("scroll", handleScroll)
  };
}, []);

  return (
    <>
        <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-xl-10 mt-3 table-responsive">
          <h2 className='text-center text-primary'>Newsletters</h2>
          <table className='table table-bordered'>
            <thead className='bg-primary text-light'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Message ? <tr><td colSpan='4'><p className='alert alert-danger text-center'>{Message}</p></td></tr>
                : Newsletter.slice(0, Page * PageSize).map((elem, index) => {
                  return <tr key={index}>
                    <td>{elem._id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td> <button onClick={() => deleteNewsletter(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
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

export default AdminNewsletters
