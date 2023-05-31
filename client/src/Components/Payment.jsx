import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {GetCheckoutUserAction} from "../Store/Actions/CheckoutAction"
import useRazorpay from "react-razorpay";

const Payment = () => {
    var {_id} = useParams()
     var navigate = useNavigate()
     const [User, setUser] = useState({});
     const [Checkouts, setCheckouts] = useState({});
     const Razorpay = useRazorpay();
      var allCheckouts = useSelector((state)=> state.CheckoutStateData)
      var dispatch = useDispatch()
      
    async function GetApiData() {
        dispatch(GetCheckoutUserAction())
        var result;
        if (_id==="-1") {
            result = allCheckouts[0]
        }else{
            result = allCheckouts.find((item)=> item._id === _id)
            console.log("1", result);
        }
        setCheckouts(result)

        var response = await fetch("/user/" + localStorage.getItem("UserId"),{
            method:"get",
            headers:{"content-type":"application/json",
                    "authorization": localStorage.getItem("token")
       }})
       response = await response.json()
         if (response.result==="Done") {
            setUser(response.data)
         }
     }

     const handlePayment = async () => {
        try {
            var response = await fetch("/payment/orders",{
                method:"post",
                headers:{ "Content-Type":"application/json",
                    "authorization": localStorage.getItem("token")}, 
            body: JSON.stringify({amount: Checkouts.finalAmount})
            })
            response = await response.json()
            initPayment(response.data)
        } catch (error) {
            console.log(error);
        }
     }

     const initPayment = (data) => {
        const options = {
            key: "rzp_test_jHgvhJbR3V1b5t",
            amount: data.amount,
            currency: "INR",
            order_id: data._id,
            "prefill": {
                "name": User.name,
                "email": User.email,
                "contact": User.phone,
            },
            handler: async (response) => {
                try {
                    var item = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        checkid: Checkouts._id
                    }
                    var response = await fetch("/payment/verify", {
                        method: "put",
                        headers: {
                            "content-type": "application/json",
                            "authorization": localStorage.getItem("token")
                        },
                        body: JSON.stringify(item)
                    });
                    response = await response.json()
                    console.log(response);
                    if (response.result === "Done"){
                        navigate("/confirmation")
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };



useEffect(() => {
    GetApiData()
}, [allCheckouts.length]);
  return (
    <>
          
          
        <div className="text-center mt-5">
            <button onClick={handlePayment} className="btn btn-primary text-light ">Pay Via RazorPay</button>
        </div>
          
    </>
  )
}

export default Payment
