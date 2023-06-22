import { useStore } from "@/lib/useStore"
import {UserPlus, UserCircle,Newspaper} from "phosphor-react"
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseconfig";
import Image from "next/image";
export default function Banner()
{
    const {user,setUser,resetUser,session,setSession,resetSession}=useStore();
    async function handleSignOut()
    {
        signOut(auth).then(() => {
          resetUser();
          resetSession();
        }).catch((error) => {
          console.log("Error signing out");
        });
    }
    return (
        <main className="  md:rounded-br-[20rem] md:rounded-[5rem] lg:rounded-br-[25rem] xl:rounded-br-[30rem] box-content relative bg-white  flex flex-col md:flex-row items-center justify-center overflow-hidden h-auto  md:h-[88vh] md:mt-5 bg-gradient-to-l from-blue-600 to-pink-400  gap-10 ">
            <div className="absolute bottom-0 w-[400px] h-[400px] z-[1] right-[-12rem] md:rounded-tl-[80rem]  lg:rounded-tl-[25rem] xl:rounded-tl-[30rem] hidden md:block bg-orange-300">
                 
            </div>
            <div className="md:w-[45%] w-[90%] md:ml-10 text-center md:text-start z-40 mt-20 md:mt-5 p-10">
                <h2 className="font-semibold text-transparent text-orange-400 text-7xl md:text-blue-900 bg-gradient-to-l from-blue-600 to-blue-300 bg-clip-text md:text-8xl font-poppins">NewsLy</h2>
                <p className="mt-5 mb-3 text-3xl font-semibold text-white md:text-white md:w-[400px]">Get Top News Headlines at your fingertips<br></br><br></br>Bookmark News to read them later</p>
                {
                    user==null?(
                        <div className="flex flex-col gap-5 mt-5 md:flex-row md:gap-6">
                            <a href="/signup" className="p-2 font-semibold text-center bg-pink-400 rounded-full md:px-5">Sign Up</a>
                            <a href="/signin" className="p-2 font-semibold text-center bg-blue-200 rounded-full md:px-5">Sign In</a>
                        </div>
                    ):(<a href="/news" className="flex gap-2 p-2 mt-5 font-semibold text-center bg-blue-500 text-white rounded-full md:px-5 md:w-[200px] justify-center items-center">Read News<Newspaper size={25} color="#000000" weight="fill"/></a>)
                }
            </div>
            <div className="md:w-[55%] w-[90%] ">
                <Image src="/banner9.png" width={600} height={600} alt="banner"  />
            </div>
            <div className="absolute hidden md:block left-[-20rem] top-[-17rem] rotate-90 ">
                <Image  className="-z-20 w-[600px] h-[600px] bg-cover " src="/blob.png" width={500} height={500} alt="banner"  />
            </div>  
            <Image className="hidden md:absolute md:top-40 md:left-50" src="/floatingnews.jpg" width={60} height={60} alt="floating news " />
            <Image className="hidden md:absolute md:top-40 md:right-48" src="/floatingimages2.jpg" width={50} height={40} alt="floating news " />
            {/* <Image className="absolute bottom-40 left-64" src="/floatingimages3.jpg" width={100} height={100} alt="floating news " /> */}
  </main>
    )
}