import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const UpdateProfile = () => {
    var navigate = useNavigate()
    const [User, setUser] = useState({});

    function changeHandler(e) {
        var name = e.target.name
        var value = e.target.value
        setUser((old) => {
            return { ...old, [name]: value }
        })
    }

    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0]

        setUser((old) => {
            return { ...old, [name]: value }
        })
    }

    async function postData(e) {
        e.preventDefault()
        var formData = new FormData()
        formData.append("name", User.name)
        formData.append("email", User.email)
        formData.append("phone", User.phone)
        formData.append("pic", User.pic)
        formData.append("addressline1", User.addressline1)
        formData.append("addressline2", User.addressline2)
        formData.append("addressline3", User.addressline3)
        formData.append("pin", User.pin)
        formData.append("city", User.city)
        formData.append("state", User.state)
        formData.append("_id", localStorage.getItem("UserId"))

        var response;
        if (localStorage.getItem("role") === "Admin") {
            response = await fetch("/user/update-admin/" + localStorage.getItem("UserId"), {
                method: "put",
                headers: { "authorization": localStorage.getItem("token") },
                body: formData
            })

        }else {
            response = await fetch("/user/update-user/" + localStorage.getItem("UserId"), {
                method: "put",
                headers: { "authorization": localStorage.getItem("token") },
                body: formData
            })
        }

        response = await response.json()
        if (response.result === "Done") {
            if (localStorage.getItem('role') === "Admin") {
                navigate("/admin-home")
            } else {
                navigate("/profile")
            }
        } else{
        alert(response.message)
        }
        console.log(response);
    }

    async function getApiData() {
        var response;
        if (localStorage.getItem("role") === "Admin") {
            response = await fetch("/user/admin/" + localStorage.getItem("UserId"), {
                method: "get",
                headers: { "authorization": localStorage.getItem("token") }
            })
          
        } else {
            response = await fetch("/user/" + localStorage.getItem("UserId"), {
                method: "get",
                headers: { "authorization": localStorage.getItem("token") }
            })
        }
        response = await response.json()
        if (response.result === "Done") {
            if (localStorage.getItem("role")==="Admin") {
                setUser(response.data)
            }else{
                setUser(response.data[0])
            }
        }else{
            alert(response.message)
        }
        console.log(response.data);

    }

    useEffect(() => {
        getApiData()
    }, []);

    return (
        <>
            <div className="hero-wrap hero-bread mt-3">
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center">
                            <div className="container-fluid w-100">
                                <div className='m-auto w-100'>
                                    <h5 className='text-center bg-primary p-2 text-light'>Profile Update Section</h5>
                                    <form onSubmit={postData}>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="name" id="name" placeholder='Enter Full Name : ' className='form-control'
                                                    onChange={changeHandler} value={User.name !== undefined ? User.name : ""} />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type="file" name="pic" onChange={getFile} id="pic" className='form-control' 
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type="email" name="email" id="email" placeholder='Enter Email Address : ' className='form-control'
                                                    onChange={changeHandler} value={User.email !== undefined ? User.email : ""} />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="phone" id="phone" placeholder='Enter Phone Number: ' className='form-control'
                                                    onChange={changeHandler} value={User.phone !== undefined ? User.phone : ""} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="addressline1" id="addressline1" placeholder='Enter House,Floor or Building Number : ' className='form-control'
                                                    onChange={changeHandler} value={User.addressline1 !== undefined ? User.addressline1 : ""}
                                                />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="addressline2" id="addressline2" placeholder='Enter Street Number or Near By : ' className='form-control'
                                                    onChange={changeHandler} value={User.addressline2 !== undefined ? User.addressline2 : ""} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="addressline3" id="addressline3" placeholder='Enter Village or Locality : ' className='form-control'
                                                    onChange={changeHandler} value={User.addressline3 !== undefined ? User.addressline3 : ""}
                                                />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="pin" id="pin" placeholder='Enter Pincode : ' className='form-control'
                                                    onChange={changeHandler} value={User.pin !== undefined ? User.pin : ""} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="city" id="city" placeholder='Enter City Name : ' className='form-control'
                                                    onChange={changeHandler} value={User.city !== undefined ? User.city : ""} />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type="text" name="state" id="state" placeholder='Enter State Name : ' className='form-control'
                                                    onChange={changeHandler} value={User.state !== undefined ? User.state : ""} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <button className='btn btn-primary text-light w-100' style={{ borderRadius: "30px" }} type='submit'>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
