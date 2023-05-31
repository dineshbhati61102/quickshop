import React, { useState, useEffect } from 'react'
import LeftNav from './LeftNav';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  GetProductAction, UpdateProductAction } from '../../Store/Actions/ProductAction';
import { GetMaincategoryAction } from '../../Store/Actions/MaincategoryAction';
import { GetSubcategoryAction } from '../../Store/Actions/SubcategoryAction';
import { GetBrandAction } from '../../Store/Actions/BrandAction';

const AdminUpdateProduct = () => {
    var {_id} = useParams()
  var navigate =useNavigate()
   var dispatch = useDispatch()
   var allProducts = useSelector((state)=> state.ProductStateData)
   var allMaincategories = useSelector((state)=> state.MaincategoryStateData)
   var allSubcategories = useSelector((state)=> state.SubcategoryStateData)
   var allBrands = useSelector((state)=> state.BrandStateData)

  const [Products, setProducts] = useState([])

  function changeHandler(e) {
    var name = e.target.name
    var value = e.target.value
    setProducts((old) => {
      return { ...old, [name]: value }
    })}

    function getFile(e) {
      var name = e.target.name
      var value = e.target.files[0]
      setProducts((old) => {
          return {
              ...old,
              [name]: value
          }
      })
    }


 function postData(e) {
    e.preventDefault()
    var basePrice= Number(Products.baseprice)
    var discount = Number(Products.discount)
    var finalPrice = parseInt(basePrice- basePrice* discount / 100)
    var maincategory = Products.maincategory
    var subcategory = Products.subcategory
    var brand = Products.brand
    if (maincategory === "")
        maincategory = allMaincategories[0].name
    if (subcategory === "")
        subcategory = allSubcategories[0].name
    if (brand === "")
        brand = allBrands[0].name

    var formData = new FormData()
    formData.append("name", Products.name)
    formData.append("maincategory", maincategory)
    formData.append("subcategory", subcategory)
    formData.append("brand", brand)
    formData.append("color", Products.color)
    formData.append("size", Products.size)
    formData.append("baseprice", basePrice)
    formData.append("discount", discount)
    formData.append("finalprice", finalPrice)
    formData.append("stock", Products.stock)
    formData.append("description", Products.description)
    formData.append("pic1", Products.pic1)
    formData.append("pic2", Products.pic2)
    formData.append("pic3", Products.pic3)
    formData.append("pic4", Products.pic4)

    dispatch(UpdateProductAction({_id, data:formData}))
    navigate("/admin-products")
  }

  useEffect(() => {
    dispatch(GetMaincategoryAction())
    dispatch(GetBrandAction())
    dispatch(GetSubcategoryAction())
    dispatch(GetProductAction())
    var item = allProducts.find((item)=> item._id === _id)
    if (item) {
        setProducts(item)
    }
  }, [allProducts.length]);

  return (
    <> 
    
<div className='container-fluid'>
    <div className="row">
    <div className="col-sm-4 col-md-3 col-xl-2 mt-5">
          <LeftNav />
    </div>

    <div className="col-sm-8 col-md-9 col-xl-10 mt-5">
      <h5 className='bg-primary text-center text-light p-1'>Products</h5>
      
         <form onSubmit={postData} className='p-3'>
        <div className='row'>
         <div className='control-group col-12'>
         <label htmlFor="name">Name</label><br />
           <input type="text" className="form-control" placeholder='Enter Product Name' name='name'
            onChange={changeHandler} id='name' value={Products.name !==undefined ? Products.name:""}/>
           </div> </div>

          <div className='row mt-3'>
           <div className='control-group col-3'>
         <label htmlFor="maincategory">Maincategory</label><br />
         <select className="form-select" onChange={changeHandler} id='maincategory' name='maincategory'
         value={Products.maincategory !==undefined ? Products.maincategory:""}  >
         {allMaincategories.map((elem,index)=>{
            return <option key={index} value={elem.name}>{elem.name}</option>
          })}
          </select>
           </div>

           <div className='control-group col-3'>
         <label htmlFor="subcategory">Subcategory</label><br />
         <select className="form-select" onChange={changeHandler}  id='subcategory' name='subcategory'
         value={Products.subcategory !==undefined ? Products.subcategory:""}>
         {allSubcategories.map((elem,index)=>{
            return <option key={index} value={elem.name}>{elem.name}</option>
          })}
          </select>
           </div>

           <div className='control-group col-3'>
         <label htmlFor="brand">Brand</label><br />
         <select className="form-select" onChange={changeHandler}  id='brand' name='brand'
         value={Products.brand !==undefined ? Products.brand:""}>
          {allBrands.map((elem,index)=>{
            return <option key={index} value={elem.name}>{elem.name}</option>
          })}
          </select>
           </div>

           <div className='control-group col-3'>
         <label htmlFor="stock">Stock</label><br />
         <select className="form-select" onChange={changeHandler}  id='stock' name='stock'
         value={Products.stock !==undefined ? Products.stock:""}>
            <option value="In Stock">In Stock</option>
            <option value="Out Of Stock">Out Of Stock</option>
          </select>
           </div>
           </div>

           <div className='row mt-4'>
         <div className='control-group col-6'>
         <label htmlFor="color">Color</label><br />
           <input type="text" className="form-control" placeholder='Enter Color' name='color'
            onChange={changeHandler} id='stock' value={Products.color !==undefined ? Products.color:""}/>
           </div>

           <div className='control-group col-6'>
         <label htmlFor="size">Size</label><br />
           <input type="text" className="form-control" placeholder='Enter Size' name='size'
            onChange={changeHandler} id='size' value={Products.size !==undefined ? Products.size:""}/>
           </div>
            </div>
      

            <div className='row mt-4'>
         <div className='control-group col-6'>
         <label htmlFor="baseprice">Base Price</label><br />
           <input type="text" className="form-control" placeholder='Enter Base Price' name='baseprice'
            onChange={changeHandler} id='baseprice' value={Products.baseprice !==undefined ? Products.baseprice:""}/>
           </div>

           <div className='control-group col-6'>
         <label htmlFor="discount">Discount</label><br />
           <input type="text" className="form-control" placeholder='Enter Discount' name='discount'
            onChange={changeHandler} 
           id='discount' value={Products.discount !==undefined ? Products.discount:""}/>
           </div>
            </div>

             <div className='row mt-4'>
             <div className='control-group col-6'>
         <label htmlFor="description">Description</label><br />
         <textarea className="form-control" id='description'  placeholder="Enter Description"  name='description'
          onChange={changeHandler} value={Products.description !==undefined ? Products.description:""}>
        </textarea>
           </div>
             </div>

            <div className='row mt-4'>
               <div className='control-group col-6'>
            <label htmlFor="formFile" className="form-label">Pic1</label>
            <input type="file" onChange={getFile} name="pic1"  className="form-control"/>
               </div>

               <div className='control-group col-6'>
            <label htmlFor="formFile" className="form-label">Pic2</label>
            <input type="file" onChange={getFile} name="pic2"  className="form-control"/>
               </div>
            </div>

            <div className='row mt-4'>
               <div className='control-group col-6'>
            <label htmlFor="formFile" className="form-label">Pic3</label>
            <input type="file" onChange={getFile} name="pic3"  className="form-control"/>
               </div>

               <div className='control-group col-6'>
            <label htmlFor="formFile" className="form-label">Pic4</label>
            <input type="file" onChange={getFile} name="pic4"  className="form-control"/>
               </div>
            </div>
            
          <div>
        <button className="btn btn-primary text-light py-2 px-4 mt-5 w-100" type="submit" >Update</button>
          </div>
         </form>
         </div>
    </div>
    </div>
    </>
  )
}

export default AdminUpdateProduct
