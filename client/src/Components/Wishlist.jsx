import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {GetWishlistAction, DeleteWishlistAction} from "../Store/Actions/WishlistAction"

const Wishlist = () => {
    var dispatch = useDispatch()
    const [Wishlist, setWishlist] = useState([]);
    var  allWishlist = useSelector((state)=> state.WishlistStateData)

   function GetApiData() {
      dispatch(GetWishlistAction())
      if (allWishlist.length) {
        setWishlist(allWishlist)
      }
   }   
     
 function deleteWishlist(_id) {
      dispatch(DeleteWishlistAction({_id:_id}))
      GetApiData()
   }

useEffect(() => {
    GetApiData()
}, [allWishlist.length]);
  return (
    <>

    {/* <!-- Page Header Start --> */}
  <div className="container-fluid">
    <div className="col-sm-12 bg-secondary my-3 "> 
            <h1 className="font-weight-semi-bold text-capitalize text-center mb-3 py-2">Wishlist Section</h1>           
      </div>
            {/* <!-- Page Header End --> */}
            <div className="row mt-5">
            <div className="col-md-12 mb-5">
            <table className="table table-bordered table-responsive-sm text-center mb-0">
            <thead className="bg-secondary text-dark">
            <tr>
            <th>Products</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Remove</th>
            </tr>
            </thead>
            <tbody className="align-middle">
           {Wishlist.map((elem,index)=>{
            return  <tr key={index}>
            <td className="align-middle"><img src={`/public/products/${elem.pic}`} alt="" style={{ width: "50px" }} /> {elem.name}</td>
            <td className="align-middle">{elem.color}</td>
            <td className="align-middle">{elem.size}</td>
            <td className="align-middle">&#8377;{elem.price}</td>
            <td className="align-middle"><button onClick={()=> deleteWishlist(elem._id)} className="btn btn-sm btn-primary text-light"><i className="fa fa-times"></i></button></td>
            </tr>
            })}
            </tbody>
            </table>
            </div>
            </div>
            </div>
    </>
  )
}

export default Wishlist
