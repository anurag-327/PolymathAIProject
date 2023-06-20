"use client"
import Banner from "@/components/Banner"
import Loader from "@/components/Loader";
import { useStore } from "@/lib/useStore";
export default function Home() {
  const {globalLoading,setGlobalLoading}=useStore();
  return (
    <>
      {
        globalLoading?( <main className="box-content flex flex-col items-center justify-center min-h-screen gap-10">
          <Loader />
          <span>Setting Up Dashboard</span>
        </main>):(<Banner />)
      }  
    </>
   
  )
}
