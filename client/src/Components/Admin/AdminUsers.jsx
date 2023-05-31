import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import LeftNav from "./LeftNav"
import {DeleteUserAction, GetUserAction} from "../../Store/Actions/UserAction"

const AdminUsers = () => {
  const [Users, setUsers] = useState([]);
        var dispatch = useDispatch()
       var allUsers = useSelector((state)=> state.UserStateData)

  function getUser(){
     dispatch(GetUserAction())
     if (allUsers.length) {
      setUsers(allUsers)
     }
  }
     function deleteUser(_id) {
        dispatch(DeleteUserAction({_id}))
        getUser()
     }

  useEffect(() => {
    getUser()
  }, [allUsers.length]);


  return (
    <>
   
<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-3 table-responsive">
        <h2 className='text-center text-primary'>Users</h2>
      <table className='table table-bordered'>
        <thead className='bg-primary text-light'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pin</th>
            <th>City</th>
            <th>State</th>
            <th>Pic</th>
            <th>Role</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>   
        <tbody>
       { Users.map((elem, index)=>{
         return  <tr key={index}>
            <td>{elem.name}</td>
            <td>{elem.email}</td>
            <td>{elem.username}</td>
            <td>{elem.phone}</td>
            <td>{elem.addressline1} {elem.addressline2} {elem.addressline3}</td>
            <td>{elem.pin}</td>
            <td>{elem.city}</td>
            <td>{elem.state}</td>
            <td><img src={`/public/users/${elem.pic}`} alt={`${elem.name} image`} style={{width:'100px', height:'100px'}} /></td>
            <td>{elem.role}</td>
            <td>{elem.status}</td>
            <td> <button onClick={() => deleteUser(elem._id)} className='btn btn-primary text-light'>Delete</button></td>
             </tr>
             
       })
        }
         </tbody>
      </table>
       </div>
      </div>
      </div>
    </>
  )
}

export default AdminUsers
