import React, { useState } from 'react'
import Link from 'next/link';
import { useStore } from '@/lib/useStore';
import { X,List,UserCircle,SignOut } from 'phosphor-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseconfig';
import Image from 'next/image';
const Navbar = () => {
  const {user,resetUser}=useStore();
  const [userDrawer,setUserDrawer]=useState(false);
  function openUser()
  {
    setUserDrawer(!userDrawer)
  }
  async function handleSignOut()
  {
      signOut(auth).then(() => {
        resetUser();
      }).catch((error) => {
        console.log("Error signing out",error);
      });
  }
  function manipulateDrawer()
  {
      document.getElementById("navDrawer").classList.toggle("hidden");
      document.getElementById("navDrawer").classList.toggle("w-[300px]");
      document.getElementById("navDrawer").classList.toggle("w-[0px]");
      document.getElementById("navX").classList.toggle("hidden");
      document.getElementById("navList").classList.toggle("hidden");
  }
  return (
   <div className='relative flex items-center justify-end gap-5 p-1 bg-white shadow-md dark:bg-slate-900 md:justify-between'>
      <div id="navDrawer" className='absolute text-white hidden md:flex-row transform duration-1000 md:gap-5 md:relative md:block md:top-0 md:h-auto md:flex-row  md:text-black flex flex-col p-1 items-center justify-center h-screen w-[0px] bg-[#333] dark:bg-transparent md:bg-white  dark:text-white z-10 gap-5 top-0 left-0'>
        {
          user?( <button className='flex items-center justify-center gap-1 p-1 rounded-md md:hidden'><SignOut size={20} color='#ffffff' fill='bold'/>Signout</button>):(
            <>
               <a className=' md:border md:p-1 md:mx-4 md:border-gray-500 md:rounded-md' href="/signin">Signin</a>
               <a className=' md:border md:p-1 md:border-gray-500 md:rounded-md' href="/signup">Signup</a>
            </>
          )
        }
         
        
      </div>
      <div className='flex gap-5'>
        {
          user&&(<>
            <UserCircle className='cursor-pointer md:mr-4 ' onClick={openUser} size={30} color='#000000' fill='bold'/>
            
            </>)
        }  
        {
          (userDrawer&&user)&&(
          <div className='absolute p-4 text-center bg-gray-300 border-2 top-11 md:top-10 right-1'>
             <Image className='mx-auto rounded-full' src="/user.jpg" width={60} height={60} alt={user.email}/>
             <span className='mt-5 text-sm'>{user.email}</span>
             <button onClick={handleSignOut} className='flex items-center justify-center gap-1 p-1 mx-auto mt-5 text-sm text-white bg-red-500 border-2 border-gray-400 rounded-md '><SignOut size={20} color='#ffffff' fill='bold'/>Signout</button>
        </div>)
        }
        
      </div>
      <div className='md:hidden'>
          <button id="navX" onClick={manipulateDrawer} className='hidden text-black dark:text-white'><X size={30}  fill='bold'/></button>
          <button className='text-black dark:text-white'  id="navList" onClick={manipulateDrawer}><List size={30}  fill='bold'/></button>
      </div>
   </div>
  )
}

export default Navbar
