import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    var navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [User, setUser] = useState({
        username: "",
        password: "",
    })

    function changeHandler(e) {
        var name = e.target.name
        var value = e.target.value
        setUser((old) => {
            return { ...old, [name]: value }
        })
    }

    async function postData(e) {
        e.preventDefault()
        var response = await fetch("/user/login", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username: User.username, password: User.password })
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.setItem("login", true)
            localStorage.setItem("UserId", response.data._id)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("token", response.token)
            alert(response.message)
            
            if (response.data.role === "Admin") {
                navigate("/admin-home")
            } else {
                navigate("/profile")
            }
        } else {
            alert(response.message)
        }
    }

    
    

    return (
        <>
            <div className='row p-5 m-5 justify-content-center'>
                <div className='col-lg-6 col-sm-10 py-3 border'>
                    <h4 className='bg-primary text-light text-center py-3 mt-4'>Login</h4>
                    <form className='mt-5' onSubmit={postData} method='post'>
                        <div className="control-group">
                            <input name='username' type="text" className="form-control " id="username" placeholder="Username"
                                onChange={changeHandler} required="required" />
                        </div>



                        <div className="control-group  mt-3 mb-3">
                            <input name='password' type={showPassword ? 'text' : 'password'} className="form-control " id="password" placeholder="Password"
                                onChange={changeHandler} required="required" />

                         <div className='empty1'></div>
                         <div className='showHidePass'>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                onClick={handleShowPassword}
                            ></i>
                            </div>
                             <div className="clearfix"></div>
                        </div>



                        <div className='row'>
                            <div className='col col-6'>
                                <button className="btn btn-primary text-light py-2 px-4 m-4" type="submit" id="signUp">
                                    Login</button>
                            </div>
                        </div>

                        <div className='row '>
                            <div className='col text-center  border pt-3'>
                                <p>
                                    <Link to="/forget-password-1">Forget Password?</Link>
                                </p>
                                <p>
                                    Don't Have An Account? <Link to="/signup">Create New Account </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login
