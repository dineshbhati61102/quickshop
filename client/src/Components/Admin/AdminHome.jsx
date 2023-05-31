import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'


const AdminHome = () => {
  var [User, setUser] = useState({});
  var navigate = useNavigate()

    async function getApiData() {
      var response = await fetch("/user/admin/" + localStorage.getItem("UserId"),{
        method:"get",
        headers:{"content-type":"application/json",
          "authorization": localStorage.getItem("token")}
      })
      response = await response.json()

      if (response.result === "Done") {
          setUser(response.data)
      }else{
        navigate("/login")
      }
    }

useEffect(() => {
  getApiData()
}, []);
  return (
    <>
    
    <div className='container-fluid'>
    <div className="row">
    <div className="col-sm-3 col-lg-3 col-xl-2 mt-5 nav_bar ">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-lg-9 col-xl-10 mt-5">
    <div className='container'>
    <h5 className='bg-primary text-center text-light p-1'>Admin Profile</h5>
          <div className='row justify-content-center mt-5'>
            <div className='col-md-4 col-lg-3 col-xl-3 p-1'>
              <img src={`/public/users/${User.pic}`} className='img-fluid admin_img'  alt={`${User.name} Image`} 
                 style={{borderRadius:"50%", border:"5px solid grey"}}
              />
            </div>

            <div className='col-md-8 col-lg-9 col-xl-7 admin_home'>
              <div className='row justify-content-center '>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>Name</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.name}</div>
              </div>
              <div className='row justify-content-center '>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>User Name</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.username}</div>
              </div>
              <div className='row justify-content-center '>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>Email</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.email}</div>
              </div>
              <div className='row justify-content-center '>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>Phone</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.phone}</div>
              </div>
              <div className='row justify-content-center '>
                <div className='col-lg-3 col-md-4 col-sm-4 border p-2'>Role</div>
                <div className='col-lg-7 col-md-8 col-sm-8 border p-2'>{User.role}</div>
              </div>
              <div className='row justify-content-center mt-3 '>
                <div className="col-lg-10 col-md-12 col-sm-12 update_btn">
                <Link to={`/update-profile/${User._id}`} className='btn btn-primary text-light '>Update Profile</Link>
              </div>
              </div>
              </div>
            </div>
            </div>
            </div> 
</div>
</div>

    </>
  )
}

export default AdminHome
