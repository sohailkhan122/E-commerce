"use client"
import React from 'react'
import LogIn from '../Components/Authentication/LogIn'
import { useSearchParams } from 'next/navigation'

const Page = () => {
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get('returnUrl')
    console.log("🚀 ~ returnUrl:", returnUrl)
    
    return (
        <LogIn returnUrl={returnUrl} />
    )
}
export default Page
