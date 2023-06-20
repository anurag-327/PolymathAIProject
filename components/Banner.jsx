import { useStore } from "@/lib/useStore"
import {UserPlus, UserCircle} from "phosphor-react"
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseconfig";
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
        <main className="box-content flex flex-col items-center justify-center min-h-screen gap-10">
        <div>
            <h1 className="text-4xl font-bold text-center">Modern Full fleged Authentication</h1>
            <p className="text-lg text-center text-gray-400">Implemented with supabase</p>
        </div>
        {
        (user==null)?(<>
          <a href="/signup" className='w-[90%] max-w-[400px] md:w-[400px]  flex gap-5 p-6 justify-center shadow-sm items-center  dark:border dark:border-gray-700 hover:border-gray-300 hover:dark:border-gray-400 hover:border rounded-md whitespace-pre-wrap'>
            <div>
                <UserPlus size={40} color="#7070e1" weight="bold" />
            </div>
            <div>
                <h2 className="font-bold text-md">Sign Up for an account</h2>
                <p className="p-1 font-mono text-gray-500 dark:text-gray-400">Sign up to create your account and join with us</p>
            </div> 
        </a>
        <a  href="/signin" className='w-[90%] max-w-[400px] md:w-[400px] md:w flex gap-5 p-6 justify-center shadow-sm items-center  dark:border dark:border-gray-700 hover:dark:border-gray-400 hover:border-gray-300 hover:border rounded-md whitespace-pre-wrap'>
            <div>
            <UserCircle size={32} color="#3c3cdd" weight="bold" />
            </div>
            <div>
                <h2 className="font-bold text-md">Sign In to your account</h2>
                <p className="p-1 font-mono text-gray-500 dark:text-gray-400">Sign in to access your account and dashboard</p>
            </div> 
        </a>
        </>):(
          <div onClick={handleSignOut} className='w-[90%] cursor-pointer max-w-[400px] md:w-[400px] md:w flex gap-5 p-6 justify-center shadow-sm items-center  dark:border dark:border-gray-700 hover:dark:border-gray-400 hover:border-gray-300 hover:border rounded-md whitespace-pre-wrap'>
            <div>
            <UserCircle size={32} color="#3c3cdd" weight="bold" />
            </div>
            <div>
                <h2 className="font-bold text-md">Sign Out Of your account</h2>
                <p className="p-1 font-mono text-gray-500 dark:text-gray-400">Sign Out to access your account and dashboard</p>
            </div> 
        </div>
        )}
        
  </main>
    )
}