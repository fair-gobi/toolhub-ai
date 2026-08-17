"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminAddButton(){
  const [isAdmin, setIsAdmin] = useState(false)
  
  useEffect(()=>{
    // only you have admin_key in localStorage after login at /admin/add-prompt
    const key = localStorage.getItem("admin_key")
    if(key) setIsAdmin(true)
  },[])

  if(!isAdmin) return null

  return (
    <Link href="/admin/add-prompt" className="ml-auto bg-violet-600 hover:bg-violet-700 text-white text-xs px-4 py-2 rounded-full font-medium">
      + Add New
    </Link>
  )
}