import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const Search = () => {
    const location = useLocation()
    const searchQuery = new URLSearchParams(location.search).get("product");
    const [SearchResult, setSearchResult] = useState([]);

    async function GetApiData() {
        var response = await fetch("/product/search",{
            method:"post",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({search:searchQuery})
        })
        response = await response.json()
       if (response.result==="Done") {
          setSearchResult(response.data)
       }
    }

    useEffect(() => {
        GetApiData()
    }, [searchQuery]);
  return (
    <>

<div className="container-fluid pt-5">
  <div className="row px-xl-5">
       { SearchResult.length >0 ? SearchResult.map((elem,index)=>{

return  <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
       <div className="card product-item border-0 mb-4">
           <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
               <img className="img-fluid w-100" src={`/public/products/${elem.pic1}`}  alt={elem.name}/>
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
}) : 
   <div className='text-center'>
    <h1 className='text-primary'>0 Result Found</h1>
   </div>

} 
</div>
</div> 


    </>
  )
}

export default Search
