"use client"
import React from 'react'
import ProductDetails from '../../Components/ProductDetails/ProductDetails'

const Page = ({ params }) => {
  return (
    <>
      <ProductDetails route={params} />
    </>
  )
}
export default Page
