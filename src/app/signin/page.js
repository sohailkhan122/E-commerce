"use client"
import React from 'react'
import SignUp from '../Components/Authentication/SignIn'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')
  return (
    <SignUp returnUrl={returnUrl} />
  )
}
export default Page