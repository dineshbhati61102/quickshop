import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetProductAction } from '../Store/Actions/ProductAction'
import { useSelector, useDispatch } from 'react-redux'

const Product = () => {
    const [Product, setProduct] = useState([]);
    var dispatch = useDispatch()
      var  allProducts = useSelector((state)=> state.ProductStateData)

    function getApiData(){
    dispatch(GetProductAction())
       if (allProducts.length) {
          setProduct(allProducts)
       }
    }

    useEffect(() => {
        getApiData()
    }, [allProducts.length]);
  return (
    <>
    {/* <!-- Page Header Start --> */}
    <div className="text-center mt-5 mb-4">
            <h2 className="section-title px-5"><span className="px-2">Our Products</span></h2>
        </div>
{/* <!-- Page Header End --> */}


        {/* <!-- Shop Product Start --> */}
    <div className="container-fluid pt-5">
  <div className="row px-xl-5">
                 {Product.map((elem,index)=>{

                 return  <div className="col-lg-4 col-xl-3 col-md-6 col-sm-12 pb-1 mt-5" key={index}>
                        <div className="card product-item border-0 mb-4">
                            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img className="img-fluid product_img" style={{height:"300px", width:"100%"}} src={`/public/products/${elem.pic1}`}  alt={elem.name}/>
                            </div>
                            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 className="text-truncate mb-3">{elem.name}</h6>
                        <div className="d-flex justify-content-center">
                            <h6>Price:</h6>
                            <h6 className="text-muted ml-2"><del> &#8377;{elem.baseprice}</del><sup>{elem.discount}%Off</sup></h6> 
                            </div>
                            <h6>Final Price: &nbsp;&#8377;{elem.finalprice}</h6>
                            </div>

                            <div className="card-footer d-flex justify-content-between bg-light border">
                                <Link to={`/product-details/${elem._id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                <Link to="/cart" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                            </div>
                        </div>
                    </div>
                })    }
                    
                    
                </div>
            </div>
            {/* <!-- Shop Product End --> */}
        {/* </div> */}
    {/* </div> */}
    {/* <!-- Shop End -->  */}
    </>
  )
}

export default Product













