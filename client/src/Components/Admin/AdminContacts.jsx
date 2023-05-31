import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import LeftNav from "./LeftNav"
import {GetContactAction} from "../../Store/Actions/ContactAction"

const AdminContacts = () => {
  var dispatch = useDispatch()
  const [Page, setPage] = useState(1)
  const [PageSize, setPageSize] = useState(6)

    const [Contact, setContact] = useState([]);
    var allContacts = useSelector((state)=> state.ContactStateData)

 function getApiData() {
    dispatch(GetContactAction({ Page, PageSize }))
  }

  useEffect(() => {
    getApiData()
  }, [Page, PageSize])

  useEffect(() => {
    setContact(allContacts)
  }, [allContacts])

  function handleScroll() {
    const { scrollY, innerHeight } = window
    const { scrollHeight } = document.body

    if (scrollY + innerHeight >= scrollHeight - 500) {
      setPage((Page) => Page + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-xl-10 mt-3 table-responsive">
        <h2 className='text-center text-primary'>Contacts</h2>

{Contact.length ? (
      <table className='table table-bordered'>
        <thead className='bg-primary text-light'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>   
        <tbody>
       { Contact.slice(0, Page * PageSize).map((elem, index)=>{
         return  <tr key={index}>
            <td>{elem.name}</td>
            <td>{elem.email}</td>
            <td>{elem.subject}</td>
            <td>{elem.phone}</td>
            <td>{elem.message}</td>
            <td>{elem.status}</td>
           <td>{elem.date}</td>
           <td><Link to={`/admin-single-contact/${elem._id}`} className="btn btn-primary text-light">View</Link></td>
             </tr>
             
       })
        }
         </tbody>
      </table>
      ) : (
            <div className='text-center my-5 text-danger'>
              <h3>Loading Data...</h3>
            </div> )}
       </div>
      </div>
      </div>
    </>
  )
}

export default AdminContacts
