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
        <main className="box-content relative bg-white flex flex-col md:flex-row items-center justify-center overflow-hidden h-[85vh] bg-gradient-to-l from-blue-200 to-orange-200 via-yellow-100 gap-10 p-10">
            <div className="md:w-[40%] w-[90%] text-center md:text-start z-40 mt-32">
                <h2 className="font-semibold text-transparent text-7xl md:text-white bg-gradient-to-l from-blue-600 to-orange-300 bg-clip-text md:text-8xl font-poppins">NewsLy</h2>
                <p className="mt-5 mb-3 text-3xl font-semibold  md:text-white md:w-[400px]">Get Top News Headlines at your fingertips<br></br><br></br>Bookmark News to read them later</p>
                {
                    user==null?(
                        <div className="flex flex-col gap-5 mt-5 md:flex-row md:gap-6">
                            <a href="/signup" className="p-2 font-semibold text-center bg-pink-400 rounded-full md:px-5">Sign Up</a>
                            <a href="/signin" className="p-2 font-semibold text-center bg-blue-200 rounded-full md:px-5">Sign In</a>
                        </div>
                    ):(<a href="/news" className="flex gap-2 p-2 mt-5 font-semibold text-center bg-pink-400 rounded-full md:px-5 md:w-[200px] justify-center items-center">Read News<Newspaper size={25} color="#ffffff" weight="fill"/></a>)
                }
            </div>
            <div className="md:w-[60%] w-[80%] z-50">
                <Image  className="mix-blend-exclusion" src="/boynews2.png" width={800} height={800} alt="banner"  />
            </div>
            <div className="absolute hidden md:block left-[-25rem] top-[-17rem] rotate-90 ">
                <Image  className="-z-20 w-[1200px] h-[1200px] bg-cover " src="/blob.png" width={500} height={500} alt="banner"  />
            </div>

        
  </main>
    )
}