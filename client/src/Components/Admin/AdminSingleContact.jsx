import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import { useSelector, useDispatch } from 'react-redux'
import { GetContactAction, DeleteContactAction, UpdateContactAction} from '../../Store/Actions/ContactAction'

const AdminSingleContact = () => {
   var navigate = useNavigate()
   var {_id} = useParams()
   var allContacts = useSelector((state)=> state.ContactStateData)
  const [Contact, setContact] = useState([]);
   var dispatch = useDispatch()


    function getApiData() {
      dispatch(GetContactAction())
      var item = allContacts.find((item)=>item._id === _id)
      if(item){
         setContact(item)
      }}

      function updateRecord() {
        dispatch(UpdateContactAction({...Contact, status:"Done"}))
         setContact((old)=>{
            return{...old,['status']:"Done"}
         })
      }

      function deleteRecord() {
         dispatch(DeleteContactAction({_id}))
         navigate("/admin-contacts")
      }

useEffect(() => {
   getApiData()
}, [allContacts.length]);
  return (
    <>
       <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-xl-10 mt-5">
         <div className='row mt-2 mr-2'>
             <h4 className='bg-primary text-light text-center py-2'>Single Contact</h4>

            <div className='row'>
               <div className='col-6 border p-3'>
                  ID
               </div>
               <div className='col-6 border p-3'>
                 {Contact._id}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Name
               </div>
               <div className='col-6 border p-3'>
               {Contact.name}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Email
               </div>
               <div className='col-6 border p-3'>
               {Contact.email}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                 Phone
               </div>
               <div className='col-6 border p-3'>
               {Contact.phone}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Subject
               </div>
               <div className='col-6 border p-3'>
               {Contact.subject}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Message
               </div>
               <div className='col-6 border p-3'>
               {Contact.message}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Date
               </div>
               <div className='col-6 border p-3'>
                  {Contact.date}
               </div>
            </div>

            <div className='row'>
               <div className='col-6 border p-3'>
                  Status
               </div>
               <div className='col-6 border p-3'>
                  {Contact.status}
               </div>
               </div>

               <div className="row mt-5">
               <div className='col-12'>
               { Contact.status === "Active" ?
                  <button className='btn btn-primary w-100  text-light' onClick={updateRecord}>Update Status to Done</button>:
                  <button className='btn btn-primary w-100  text-light' onClick={deleteRecord}>Delete</button>
                }
                </div>
            </div>
        </div>
       </div>
       </div>
    </div>
    </>
  )
}

export default AdminSingleContact
