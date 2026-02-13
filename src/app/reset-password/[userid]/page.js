"use client"
import Resetpassword from '@/app/Components/Authentication/Resetpass'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = ({ params }) => {
  const token = params.userid; // <-- get dynamic param
  return (
    <div>
      <Resetpassword token={token} />
    </div>
  )
}

export default page
