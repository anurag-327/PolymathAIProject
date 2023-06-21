"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { auth,app } from '@/Firebase/firebaseconfig'
const inter = Inter({ subsets: ['latin'] })
import { useStore } from '@/lib/useStore'
import { useEffect } from 'react'
import {onAuthStateChanged } from "firebase/auth";
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
export default function RootLayout({ children }) 
{
  const {user,setUser,globalLoading,setGlobalLoading}=useStore();
  useEffect(()=>
  {
       (async function()
       {
          onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            setGlobalLoading(false);
          } else {
            console.log("No active user")
            setGlobalLoading(false)
          }
        });
        
       }())


        
  },[])
  return (
    <html lang="en">
      <head>
        <title>NewsLy</title>
        <link rel="icon" href='/favicon.ico'></link>
      </head>
      <body className={inter.className}>
        {
          globalLoading?(<main className="box-content flex flex-col items-center justify-center min-h-screen gap-10">
          <Loader />
          <span>Setting Up Dashboard</span>
        </main>):(
            <main className='bg-gradient-to-l from-blue-200 to-orange-100 via-red-200'>
            <Navbar />
            {children} 
            </main>
          )
        }
        
        </body>
    </html>
  )
}
