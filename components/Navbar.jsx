import React, { useState } from 'react'
import Link from 'next/link';
import { useStore } from '@/lib/useStore';
import { X,List,UserCircle,SignOut,HouseSimple } from 'phosphor-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseconfig';
import Image from 'next/image';
import BookmarkComponent from './Bookmark';
const Navbar = () => {
  const {user,resetUser,bookmark}=useStore();
  const [userDrawer,setUserDrawer]=useState(false);
  const [openBookmark,setBookmark]=useState(false);
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
   <div className='sticky top-0 z-50 flex items-center justify-between gap-5 p-1 bg-white shadow-md md:justify-between'>
    <div className='flex items-center justify-center gap-3'>
      <Image src="/logo.jpg" width={40} height={40} alt="log0"/>
      <h2 className='text-2xl font-bold font-poppins'>NewsLy</h2>
    </div>
      <div id="navDrawer" className='z-50 absolute text-white hidden md:flex-row   md:text-black flex flex-col p-1 items-center justify-center h-screen w-[0px] bg-[#333] dark:bg-transparent gap-5 '>
        {
          user?(<>
           <button className='flex items-center justify-center gap-1 p-1 rounded-md md:hidden'><SignOut size={20} color='#ffffff' fill='bold'/>Signout</button>
           <a className='flex items-center justify-start gap-1 p-2 text-lg text-white md:hidden hover:underline' href="/">< HouseSimple size={30} weight='bold'/>Home</a>
           </>):(
            <>
               <a className=' md:border md:hidden md:p-1 md:mx-4 md:border-gray-500 md:rounded-md' href="/signin">Signin</a>
               <a className=' md:border md:hidden md:p-1 md:border-gray-500 md:rounded-md' href="/signup">Signup</a>
            </>
          )
        }
        
      </div>
      <div className='flex items-center justify-center gap-3 mr-5'>
        {
          user?(<>
            <a className='hidden p-2 text-lg bg-gray-100 border rounded-sm md:block hover:underline' href="/">Home</a>
            <UserCircle className='text-blue-800 cursor-pointer md:mr-4' onClick={openUser} size={40}  weight='fill'/>
            </>):(<>
              <a className='hidden md:block md:border md:p-1 md:mx-4 md:border-gray-500 md:rounded-md' href="/signin">Signin</a>
               <a className='hidden md:block md:border md:p-1 md:border-gray-500 md:rounded-md' href="/signup">Signup</a>
            </>)
        }  
        {
          (userDrawer&&user)&&(
          <div className='absolute z-[100] p-4 text-center bg-white shadow-2xl  border rounded-md top-12 md:top-12 right-1'>
             <Image className='mx-auto rounded-full' src="/user.jpg" width={60} height={60} alt={user.email}/>
             <span className='mt-5 text-sm'>{user.email}</span>
             <button onClick={handleSignOut} className='flex items-center justify-center gap-1 p-1 mx-auto mt-5 text-sm text-white bg-red-500 border-2 border-gray-400 rounded-md '><SignOut size={20} color='#ffffff' fill='bold'/>Signout</button>
        </div>)
        }
        
      </div>
      <div className='md:hidden'>
          <button id="navX" onClick={manipulateDrawer} className='hidden text-black '><X size={40}  fill='bold'/></button>
          <button className='text-black'  id="navList" onClick={manipulateDrawer}><List size={40}  fill='bold'/></button>
      </div>
      
   </div>
  )
}

export default Navbar
