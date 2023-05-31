import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
     var navigate = useNavigate()
   
     const [showPassword, setShowPassword] = useState(false);
     const [showCPassword, setShowCPassword] = useState(false);
     const handleShowPassword = () => {
         setShowPassword(!showPassword);
     };
     const handleShowCPassword = () => {
         setShowCPassword(!showCPassword);
     };

    const [User,setUser]=useState({
       name:"",
       email:"",
       username:"",
       phone:"",
       password:"",
       cpassword:"",
    })
    
       
         function changeHandler(e) {
             var name = e.target.name
             var value = e.target.value
             setUser((old)=>{
                return{...old,[name]:value}
             })
         }

         async function postData(e) {
            e.preventDefault()
            const  {name, email, username, phone, password, cpassword} = User
         var response =  await fetch("/user/signup",{
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({name, email, username, phone, password, cpassword})
         })
         response = await response.json()
          console.log(response);
          if (response.result === "Done") {
            alert(response.message)
            navigate("/login")
          }else{
            alert(response.message)
          }
       }


    return (
        <>
    {/* <!-- Page Header End --> */}
            <div className='row p-5 m-5 justify-content-center'>
                <div className='col-lg-6 col-md-8 py-3 px-5 border'>
                <h4 className='bg-primary text-light text-center py-2 mt-3'>Sign Up</h4>
                    <form  onSubmit={postData}  className='mt-5'>
                    
                        <div className="control-group mb-3">
                            <input name='name' type="text" className="form-control " id="name" placeholder="Full Name"
                             onChange={changeHandler} value={User.name}  required="required"  />
                        </div>
                        <div className="control-group mb-3">
                            <input name='email' type="email" className="form-control " id="email" placeholder="Your Email"
                             onChange={changeHandler} value={User.email}  required="required"/>
                        </div>

                        <div className="control-group mb-3">
                            <input name='username' type="text" className="form-control " id="username" placeholder="Username"
                             onChange={changeHandler} value={User.username}  required="required"  />
                        </div>

                        <div className="control-group mb-3">
                            <input name='phone' type="text" className="form-control " id="phone" placeholder="Phone"
                           onChange={changeHandler} value={User.phone}  required="required"  />
                        </div>
                    
                        <div className="control-group mb-3">
                            <input name='password' type={showPassword ? 'text' : 'password'} className="form-control " id="password" placeholder="Enter Password :"
                             value={User.password}   required="required" onChange={changeHandler} />

                        <div className='empty1'></div>
                        <div className='showHidePass'>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                onClick={handleShowPassword}
                            ></i>
                        </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className="control-group mb-3">
                            <input name='cpassword' type={showCPassword ? 'text' : 'password'} className="form-control " id="cpassword" placeholder="Confirm Password :"
                             value={User.cpassword}   required="required" onChange={changeHandler} />

                        <div className='empty1'></div>
                        <div className='showHidePass'>
                            <i className={showCPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                onClick={handleShowCPassword}
                            ></i>
                        </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className='row'>
                            <div className='col col-6'>
                                <button className="btn btn-primary text-light py-2 px-4 m-4" type="submit" id="signUp">
                                    Sign Up</button>
                            </div>
                        </div>

                        <div className='row '>
                            <div className='col text-center border pt-3'>
                                <p>
                                    Have An Account? <Link to="/login">Login </Link>Here
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

     

        </>
    )
}

export default Signup
