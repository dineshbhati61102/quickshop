import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"


const ForgetPassword2 = () => {
    var navigate = useNavigate()
    const [Otp, setOtp] = useState(-1);
     
    function getData(e) {
        setOtp(e.target.value)
    }
    async function postData(e){
         e.preventDefault()
        var response = await fetch("/user/verify-otp",{
            method:"post",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({username:localStorage.getItem("reset-username"),otp:Number(Otp)})
        })
        response =  await response.json()
         if (response.result==="Done") {
            alert(response.message)
            navigate("/forget-password-3")
         }else{
            alert(response.message)
         }
     }
     
  return (
    <>
        <div className='row p-5 m-5 justify-content-center'>
                <div className='col-lg-6 col-md-8 col-sm-10 py-3 px-5 border'>
                <h5 className='bg-primary text-light text-center py-1'>Reset Password Section</h5>
                    <form  className='mt-5' onSubmit={postData}>
                        <div className="control-group">
                        <label htmlFor="otp">Otp :</label>
                            <input name='otp' type="number" className="form-control " id="otp" placeholder="Enter Your 6 Digit Otp"
                                required="required" onChange={getData}/>
                            <p className="help-block text-danger"></p>
                        </div>
                      
                        <div className='row'>
                            <div className='col col-6'>
                                <button className="btn btn-primary text-light py-2 px-4 m-4" type="submit" id="verifyOtp">
                                Submit Otp</button>
                            </div>
                        </div>

                      
                    </form>
                </div>
            </div>
 
    </>
  )
}

export default ForgetPassword2
