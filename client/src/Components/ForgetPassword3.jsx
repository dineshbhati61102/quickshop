import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const ForgetPassword3 = () => {
    var navigate = useNavigate()
    
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowCPassword = () => {
        setShowCPassword(!showCPassword);
    };
    
    const [User, setUser] = useState({
        password: "",
        cpassword: ""
    });

    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setUser((old) => {
            return { ...old, [name]: value }
        })
    }

    async function postData(e) {
        e.preventDefault()
        var response = await fetch("/user/new-password", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username: localStorage.getItem("reset-username"), password: User.password, cpassword: User.cpassword })
        })
        response = await response.json()
        if (response.result === "Done") {
            alert(response.message)
            localStorage.removeItem("reset-username")
            navigate("/login")
        } else {
            alert(response.message)
        }
    }

    return (
        <>
            <div className='row p-5 m-5 justify-content-center'>
                <div className='col-lg-6 col-md-8 col-sm-10 py-3 px-5 border'>
                    <h5 className='bg-primary text-light text-center py-1'>Reset Password Section</h5>
                    <form className='mt-5' onSubmit={postData}>

                        <div className="control-group">
                            <input name='password' type={showPassword ? 'text' : 'password'} className="form-control " id="password" placeholder="Enter New Password :"
                                required="required" onChange={getData} />

                        <div className='empty1'></div>
                        <div className='showHidePass'>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                onClick={handleShowPassword}
                            ></i>
                        </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className="control-group mt-3 mb-3">
                            <input name='cpassword' type={showCPassword ? 'text' : 'password'} className="form-control " id="cpassword" placeholder="Confirm New Password :"
                                required="required" onChange={getData} />

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
                                    Change Password</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}

export default ForgetPassword3
