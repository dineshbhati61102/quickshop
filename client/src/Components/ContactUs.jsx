import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {CreateContactAction} from "../Store/Actions/ContactAction"

const ContactUs = () => {
    var [show, setshow] = useState(false)
    var dispatch = useDispatch()
    const [Contact, setContact] = useState({
            name:"",
            email:"",
            subject:"",
            phone:"",
            message:""
    })

        function changeHandler(e){
        var name = e.target.name
        var value = e.target.value
          setContact((old)=>{
            return{...old, [name]:value}
          })
        }

        function postData(e){
            e.preventDefault()
            
            const item = {
            name: Contact.name,
            email: Contact.email,
            subject: Contact.subject,
            phone: Contact.phone,
            message: Contact.message,
        }
          dispatch(CreateContactAction(item))
          setshow(true)

          setContact({
            name:"",
            email:"",
            subject:"",
            phone:"",
            message:""
          })
        }
     
  return (
    <>


    {/* <!-- Contact Start --> */}
    <div className="container-fluid pt-5">
        <div className="text-center mb-5">
            <h2 className="section-title px-5"><span className="px-2">Contact For Any Queries</span></h2>
        </div>
        <div className="row px-xl-5">
            <div className="col-lg-6 mb-5">
                <div className="contact-form">
                { show ?
                
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
        Thank You For Share Your Query, Our Team Will Contact Soon
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
            : ""
        }
                    <div id="success"></div>
                    <form onSubmit={postData} id="contactForm" >
                        <div className="control-group">
                            <input type="text" className="form-control" id="name" placeholder="Your Name"
                               name='name' required="required"   value={Contact.name}  autoComplete="off"
                               onChange={changeHandler} />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="email" className="form-control" id="email" placeholder="Your Email"
                              name='email'  required="required"   value={Contact.email}  autoComplete="off"
                                onChange={changeHandler}
                                />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="tel" className="form-control" id="phone" placeholder="Your Phone"
                              name='phone'  required="required"   value={Contact.phone}
                                onChange={changeHandler}  autoComplete="off"
                                />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="text" className="form-control" id="subject" placeholder="Subject"
                                name='subject' required="required"   value={Contact.subject}  autoComplete="off"
                                onChange={changeHandler} />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <textarea className="form-control" rows="6" id="message" placeholder="Message"
                                value={Contact.message} required="required" onChange={changeHandler} name='message'></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                            <button className="btn btn-primary text-light py-2 px-4" type="submit" id="sendMessageButton">Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-6 mb-5">
                <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
                <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
                <div className="d-flex flex-column mb-3">
                    <h5 className="font-weight-semi-bold mb-3">Store 1</h5>
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Noida Sec-18, Near GIP Mall</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>quickshop00123@gmail.com</p>
                    <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                </div>
                <div className="d-flex flex-column">
                    <h5 className="font-weight-semi-bold mb-3">Store 2</h5>
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Noida Sec-144, Near Oxigen Bussiness Park</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>quickshop00123@gmail.com</p>
                    <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Contact End --> */}
 

 {/* google map */}
 <div className='container-fluid mt-5 mb-5'>
    <div className='row text-center'>
        <div  className='col col-6 p-5'>
        <h4>Store-1 Location</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7008.00292323846!2d77.31755923907876!3d28.56971882528023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce44f2ca1470f%3A0x8cff905b6cbfb433!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1683899775288!5m2!1sen!2sin" width="100%" height="450px" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div  className='col col-6 p-5'>
        <h4>Store-2 Location</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112167.06904535815!2d77.29545303906248!3d28.5330790816343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9b07738b247%3A0x1bf7fd1974706c4b!2sSector%20144%2C%20Noida%2C%20Uttar%20Pradesh%20201306!5e0!3m2!1sen!2sin!4v1683900164759!5m2!1sen!2sin" width="100%" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
 </div>
    </>
  )
}

export default ContactUs
