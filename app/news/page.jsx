"use client"
import { useStore } from "@/lib/useStore";
import NewsComponent from "@/components/NewsComponent";
import NewsLoading from "@/components/NewsLoading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebaseconfig";
import Notification from "@/components/Notification";
export default function News()
{
    const router=useRouter();
    const {user,setBookmark,bookmark}=useStore();
    const [news,setNews]=useState([]);
    const [apiError,setApiError]=useState();
    const [businessnews,setBusinessNews]=useState([]);
    const [entertainmentnews,setEntertainmentNews]=useState([]);
    const [sportsnews,setSportNews]=useState([]);
    const [loading,setLoading]=useState(true);
    const [section,setSection]=useState("all");
    const key="fd03af19625026cb9e3352923bc44866";
    async function getBookmarks()
    {
        const q = query(collection(db, "Bookmarks"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const temp={...doc.data(),id:doc.id}
        setBookmark(temp)
    });
    }
    useEffect(()=>
    {
        setApiError(false);
        if(!user)
        {
            router.push("/signin");    
        }
        else
        {
            (async function()
            {
                try {
                       const newsresponse=await fetch(`http://api.mediastack.com/v1/news?access_key=${key}&countries=in&limit=100`)
                       const newsdata=await newsresponse.json();
                       if(newsresponse.status==200)
                       {
                           setNews(newsdata.data)
                           setEntertainmentNews(newsdata.data.filter((data) => data.category=="entertanment"))
                           setBusinessNews(newsdata.data.filter((data) => data.category=="business"))
                           setSportNews(newsdata.data.filter((data) => data.category=="sports"))
                       }  
                       else{
                        setApiError(true);
                       }
                                          
                     getBookmarks();
                } catch (error) {
                    setApiError(true);
                    setLoading(false);
                } 
                setLoading(false)
            }())
        }
      
    },[user])
    return(
          
        <div className="relative flex flex-col items-center justify-center gap-4 " >
            <Notification />
            <div className="relative h-10 w-72 mt-12 md:hidden min-w-[200px]">
              <select onChange={(e) => setSection(e.target.value)} className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                <option  value="all" selected>All</option>
                <option  value="entertainment">Entertainment</option>
                <option  value="business">Business</option>
                <option  value="sports">Sports</option>
                <option  value="bookmarks">Bookmarks</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select a category
              </label>
            </div>
            <div className="md:w-[800px] hidden md:block  w-[90%] md:flex-row flex-col bg-white text-black box-border z-10   text-lg md:sticky relative  shadow-2xl top-24 justify-center  items-center  font-bold flex mt-5 md:justify-between rounded-tr-lg rounded-tl-lg">
                      <button onClick={() => setSection("all")} className={`${section=="all"?"bg-blue-500 text-white":"bg-white rounded-md border"} p-2 md:w-[19%]  rounded-md`}>All</button>
                      <button onClick={()=> setSection("business")} className={`${section=="business"?"bg-blue-500 text-white":"bg-white border"} p-2 md:w-[19%] rounded-md`}>Business</button>
                      <button onClick={()=> setSection("entertainment")} className={`${section=="entertainment"?"bg-blue-500 text-white":"bg-white border"} p-2 md:w-[23%] rounded-md`}>Entertainment</button>
                      <button onClick={()=> setSection("sports")} className={`${section=="sports"?"bg-blue-500 text-white":"bg-white border"} p-2 md:w-[19%]  rounded-md`}>Sports</button>
                      <button onClick={() => setSection("bookmarks")} className={`${section=="bookmarks"?"bg-blue-500 text-white":"bg-white border"} p-2 md:w-[20%] rounded-md`}>Bokmarks</button>
                      {/* <button className="w-[20%] ">Sport</button> */}
            </div>
                {
                    loading?<NewsLoading/>:(
                        <div className="flex flex-col border py-3 md:min-w-[700px] min-w-[300px] rounded-md items-center justify-start min-h-[90vh] gap-4">
                        {
                            section==="all"&&(news.map((data)=> data.image&&<NewsComponent key={data.title} data={data} section={section} />))
                        }
                        {
                            section==="business"&&(
                                businessnews.length>0?businessnews.map((data)=> data.image&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Section Empty</div>)
                        }
                        {
                            section==="entertainment"&&(
                                entertainmentnews.length>0?entertainmentnews.map((data)=> data.image&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Section Empty</div>)
                        }
                        {
                            section==="sports"&&(
                                sportsnews.length>0?sportsnews.map((data)=> data.image&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Section Empty</div>)
                        }
                        {
                            section==="bookmarks"&&(
                                bookmark.length>0?bookmark.map((data)=> data.image&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold text-green-600">No Item in your Bookmarks</div>)
                        }
                        {
                            apiError&&<div className="w-[90%] border max-w-[500px] dark:shadow-md text-black md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md border-gray-300 bg-white rounded-md p-3 flex flex-col md:w-[60%] gap-2">
                                <h2 className="text-3xl font-bold text-red-600">Note!</h2>
                                <h3> with free version of api's comes lot of restrictions, free version of media stack news api is hoisted over http protocol so browsers might not allow api to fetch data over https. to let browser fetch api allow insecure content over this website.</h3>
                                <p className="text-2xl font-bold">Steps to enable insecure content</p>
                                <div className="font-semibold">
                                    <p>For edge visit : <a className="text-blue-600 underline" >edge://settings/content/insecureContent</a></p>
                                    <p>For chrome visit : <a className="text-blue-600 underline" >edge://settings/content/insecureContent</a></p>
                                    <p>For brave visit : <a className="text-blue-600 underline" >edge://settings/content/insecureContent</a></p>
                                </div>
                                <div>
                                     <p>And this URl <span className="font-semibold">https://polymath-ai-project.vercel.app/</span> to insecure content</p>
                                </div>
                            </div>
                        }
                    </div>
                    )
                }
        </div>
    )
}
