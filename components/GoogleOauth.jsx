import { googleProvider } from "@/Firebase/firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { useStore } from "@/lib/useStore";
import { auth } from "@/Firebase/firebaseconfig";
import { useRouter } from "next/navigation";
export default function GoogleOauth()
{    
    const router=useRouter();
    const {user,setUser}=useStore();    
    async function handleGoogleOauth()
    {
       signInWithPopup(auth,googleProvider)
       .then((userCredential) =>
       {
          setUser(userCredential.user);
          router.push("/");
       }).catch((error) => {
          console.log("Error in google auth",error)
       })
    }
    return (
    <button onClick={handleGoogleOauth} className="flex items-center gap-2 p-1 text-black bg-white border border-gray-300 rounded-md"> 
       <img src="./google.jpg" alt="google" width={40} height={40} className="ml-4"/>
        <span>Continue with Google</span>
    </button>
    )
}