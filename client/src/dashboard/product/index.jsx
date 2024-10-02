import React from 'react'
import Navbar from '../Navbar'
import AddProduct from './add'
import Products from './products'

function Product() {
  return (
    <div>
        <Navbar/>
        <AddProduct/>
        <Products/>
    </div>
  )
}

export default Product