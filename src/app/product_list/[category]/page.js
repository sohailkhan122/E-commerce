'use client'
import React from 'react'
import ProductList from '../../Components/ProductListDetails'

const Page = ({ params }) => {
  return (<>
    <ProductList route={params} />
  </>
  )
}
export default Page