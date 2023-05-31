import React from 'react'
import {Link} from "react-router-dom"

const About = () => {
  return (
    <>
      {/* <!-- Page Header Start --> */}
        <div className="text-center mt-5 mb-4">
            <h2 className="section-title px-5"><span className="px-2">Know Us</span></h2>
        </div>
{/* <!-- Page Header End --> */}

         <div className="site-section border-bottom mt-5 mb-5 p-3" data-aos="fade">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="block-16">
              <figure>
                <img src="assets/img/blog_1.jpg" alt="Image placeholder" className="img-fluid rounded" width="100%" height="auto" style={{borderRadius:"50%"}} />
                <a href="https://vimeo.com/channels/staffpicks/93951774" className="play-button popup-vimeo"><span className="ion-md-play"></span></a>
              </figure>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            
            
            <div className="site-section-heading pt-3 mb-4">
              <h2 className="text-black">How We Started</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius repellat, dicta at laboriosam, nemo exercitationem itaque eveniet architecto cumque, deleniti commodi molestias repellendus quos sequi hic fugiat asperiores illum. Atque, in, fuga excepturi corrupti error corporis aliquam unde nostrum quas.</p>
            <p>Accusantium dolor ratione maiores est deleniti nihil? Dignissimos est, sunt nulla illum autem in, quibusdam cumque recusandae, laudantium minima repellendus.</p>
            
          </div>
        </div>
      </div>
    </div>

    <div className="site-section mt-5 mb-5 p-3 border-bottom" data-aos="fade">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 site-section-heading text-center  pt-4">
            <h2>The Team</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
  
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="assets/img/person_1.jpg" alt="Image placeholder" className="mb-4" width="100%" height="auto" style={{borderRadius:"50%"}} />
                  <h3 className="block-38-heading h4">Elizabeth Graham</h3>
                  <p className="block-38-subheading">CEO/Co-Founder</p>
                </div>
                <div className="block-38-body mb-5">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="assets/img/person_2.jpg" alt="Image placeholder" className="mb-4" width="100%" height="auto" style={{borderRadius:"50%"}} />
                  <h3 className="block-38-heading h4">Jennifer Greive</h3>
                  <p className="block-38-subheading">Co-Founder</p>
                </div>
                <div className="block-38-body mb-5">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="assets/img/person_3.jpg" alt="Image placeholder" className="mb-4" width="100%" height="auto" style={{borderRadius:"50%"}} />
                  <h3 className="block-38-heading h4">Patrick Marx</h3>
                  <p className="block-38-subheading">Marketing</p>
                </div>
                <div className="block-38-body mb-5">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="assets/img/person_4.jpg" alt="Image placeholder" className="mb-4" width="100%" height="auto" style={{borderRadius:"50%"}} />
                  <h3 className="block-38-heading h4">Mike Coolbert</h3>
                  <p className="block-38-subheading">Sales Manager</p>
                </div>
                <div className="block-38-body mb-5">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    {/* <!-- Featured Start --> */}
    <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "30px" }}>
                            <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                        <p>&Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reprehenderit. Error vitae eaque rerum aliquid adipisci? Perspiciatis, libero. Recusandae, natus.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "30px" }}>
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                        <p>&Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reprehenderit. Error vitae eaque rerum aliquid adipisci? Perspiciatis, libero. Recusandae, natus.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "30px" }}>
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                        <p>&Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reprehenderit. Error vitae eaque rerum aliquid adipisci? Perspiciatis, libero. Recusandae, natus.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{ padding: "30px" }}>
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                        <p>&Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reprehenderit. Error vitae eaque rerum aliquid adipisci? Perspiciatis, libero. Recusandae, natus.</p>
                    </div>
                </div>
            </div>
            {/* <!-- Featured End --> */}
    </>
  )
}

export default About
