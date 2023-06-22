"use client"
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import { Eye,Warning } from "phosphor-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleOauth from "@/components/GoogleOauth";
import GithubOauth from "@/components/GithubOauth";
import { useStore } from "@/lib/useStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { auth } from "@/Firebase/firebaseconfig";
export default function Login()
{
    const router=useRouter();
    const [toggleEye,setToggleEye]=useState(false)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState();
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const {user,setUser}=useStore();
    useEffect(() =>
     {
         if(user)
            router.push("/");
     },[])
    async function handleSignin(value)
    {
        setError()
        setLoading(true)
        try {
            
            signInWithEmailAndPassword(auth, value.email, value.password)
              .then((userCredential) => {
                setUser(userCredential.user);
                setLoading(false);
                router.push("/news");
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
                setError(error.message);
              });
        } catch (err) {
            setLoading(false)
            setError(err.message)   
        }  
    }
    return (<main className="box-content flex flex-col items-center justify-center min-h-screen text-black font-poppins ">
        <div className={`p-4 ${loading&&"pointer-events-none opacity-60"} bg-white w-[90%] max-w-[400px]  flex flex-col gap-4 md:w-[400px] shadow-md rounded-2xl`}>
            <div>
                <h2 className="text-2xl font-semibold">Sign in</h2>
                <span className="text-sm text-gray-600 ">to continue to BugsB</span>
            </div>
            <div className="flex flex-col gap-3 mt-4 oAuthContainer">
                <GoogleOauth />   
                {/* <GithubOauth />  */}
            </div>
            <div className="flex items-center justify-center gap-2 separator">
                  <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
                  <p>OR</p>
                  <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
            </div>
            <form onSubmit={handleSubmit(handleSignin)}>
                <div className="mt-2">
                    <label className="text-sm text-gray-600 " htmlFor="email">Email Address {errors.email && <span className="text-sm font-semibold text-red-500">Required*</span>}</label>
                    <input id="email" {...register("email",{required:true})} className="w-full p-2 border-2 rounded-md outline-none resize-none focus:border-2 focus:rounded-md focus:border-purple-400" type="email" ></input>
                    
                </div>
                <div className="relative mt-2">
                    <label className="text-sm text-gray-600 " htmlFor="password">Password  {errors.password && <span className="text-sm font-semibold text-red-500 ">Required *</span>}</label>
                    <input id="password" {...register("password",{required:true})} type={toggleEye?("text"):("password")}  className="w-full p-2 border-2 rounded-md outline-none resize-none focus:border-2 focus:rounded-md focus:border-red-300 "   ></input>
                    <Eye size={20} onClick={() => setToggleEye(!toggleEye)} className="absolute cursor-pointer right-3 top-[50%] bottom-[50%]" color="#17141a" weight="bold" />
                    {errors.password && <span className="font-semibold text-red-800">Your Password must contain 8 or more characters</span>}
                </div>
                {
                    error&&<div className="flex items-center justify-center gap-2 mt-4 text-sm text-center text-red-800 ">
                    <Warning size={20} color="#7da239" weight="bold" />
                    {error}</div>
                }
                <div className="flex justify-center mt-5 ">
                {
                    !loading?(
                        <button type="submit" disabled={loading} className={`w-full font-semibold  text-white bg-blue-600 p-2 rounded-md`} type="submit">Continue</button>
                    ):<div className="text-black "><Loader/></div>
                }  
              </div>
              <div className="mt-5 text-sm text-center text-black ">
                    <p>Didn't have any account? <a href="/signup" className="text-blue-800 underline">Sign Up</a></p>
              </div>
            </form>
        </div>
    </main>)
}