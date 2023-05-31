import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"


const ForgetPassword1 = () => {
    var navigate = useNavigate()
    const [Username, setUsername] = useState("");
     
    function getData(e) {
        setUsername(e.target.value)
    }
    async function postData(e){
         e.preventDefault()
        var response = await fetch("/user/reset-password",{
            method:"post",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({username:Username})
        })
        response =  await response.json()
         if (response.result==="Done") {
            alert(response.message)
            localStorage.setItem("reset-username",Username)
            navigate("/forget-password-2")
         }else{
            alert(response.message)
         }
     }

  return (
    <>
        <div className='row p-5 m-5 justify-content-center'>
                <div className='col-lg-6 col-sm-10 py-3 border'>
                <h5 className='bg-primary text-light text-center py-1'>Reset Password Section</h5>
                    <form className='mt-5' onSubmit={postData}>
                        <div className="control-group">
                        <label htmlFor="username">Username :</label>
                            <input name='username' type="text" className="form-control " id="username" placeholder="Enter Username To Reset Password"
                                required="required" onChange={getData} />
                            <p className="help-block text-danger"></p>
                        </div>
                      
                        <div className='row'>
                            <div className='col col-6'>
                                <button className="btn btn-primary text-light py-2 px-4 m-4" type="submit" id="sendOtp">
                                Send Otp</button>
                            </div>
                        </div>

                      
                    </form>
                </div>
            </div>
 
    </>
  )
}

export default ForgetPassword1
