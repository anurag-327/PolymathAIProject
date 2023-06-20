"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { auth,app } from '@/Firebase/firebaseconfig'
const inter = Inter({ subsets: ['latin'] })
import { useStore } from '@/lib/useStore'
import { useEffect } from 'react'
import {onAuthStateChanged } from "firebase/auth";
import Navbar from '@/components/Navbar'
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
        <title>SoloclProject</title>
        <link rel="icon" href='/favicon.ico'></link>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
