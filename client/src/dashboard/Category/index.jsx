import React from 'react'
import Navbar from '../Navbar'
import AddCategory from './add'
import Categories from './categories'
function Category() {
  return (
    <div>
        <Navbar/>
        <AddCategory/>
        <Categories/>
    </div>
  )
}

export default Category