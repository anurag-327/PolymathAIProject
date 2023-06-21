"use client"
import Banner from "@/components/Banner"
import Loader from "@/components/Loader";
import { useStore } from "@/lib/useStore";
export default function Home() {
  const {globalLoading,setGlobalLoading}=useStore();
  return (
    <>
     <Banner />    
    </>
   
  )
}
