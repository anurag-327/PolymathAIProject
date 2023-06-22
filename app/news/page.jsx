"use client"
import { useStore } from "@/lib/useStore";
import NewsComponent from "@/components/NewsComponent";
import NewsLoading from "@/components/NewsLoading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebaseconfig";
export default function News()
{
    const router=useRouter();
    const {user,setBookmark,bookmark}=useStore();
    const [news,setNews]=useState([]);
    const [businessnews,setBusinessNews]=useState([]);
    const [entertainmentnews,setEntertainmentNews]=useState([]);
    const [sportsnews,setSportNews]=useState([]);
    const [loading,setLoading]=useState(true);
    const [section,setSection]=useState("all");
    useEffect(()=>
    {
        if(!user)
        {
            router.push("/signin");    
        }
        else
        {
            (async function()
            {
                try {
                    var url = 'https://newsapi.org/v2/top-headlines?' +
                    'country=in&' +
                    'apiKey=2da66313ecff488db4c5a83c4eb6156a';
                    var sportsurl = 'https://newsapi.org/v2/top-headlines?' +
                    'country=in&' +'category=sports&'+
                    'apiKey=2da66313ecff488db4c5a83c4eb6156a';
                    var businessurl = 'https://newsapi.org/v2/top-headlines?' +
                    'country=in&' +'category=business&'+
                    'apiKey=2da66313ecff488db4c5a83c4eb6156a';
                    var entertainmenturl = 'https://newsapi.org/v2/top-headlines?' +
                    'country=in&' +'category=entertainment&'+
                    'apiKey=2da66313ecff488db4c5a83c4eb6156a';
                    var req = new Request(url);
                    var sportsreq = new Request(sportsurl);
                    var businessreq = new Request(businessurl);
                    var entertainmentreq = new Request(entertainmenturl);
                    const response=await fetch(url);
                    const sportsresponse=await fetch(sportsreq);
                     const entertainmentresponse=await fetch(entertainmentreq);
                    const businessresponse=await fetch(businessreq);
                    const data=await response.json();
                    const business=await businessresponse.json();
                     const entertainment=await entertainmentresponse.json();
                     const sports=await sportsresponse.json();
                    
                    setLoading(false);
                    if(response.status==200)
                    setNews(data.articles)
                    if(businessresponse.status==200)
                    setBusinessNews(business.articles)
                    if(entertainmentresponse.status==200)
                    setEntertainmentNews(entertainment.articles)
                    if(sportsresponse.status==200)
                    setSportNews(sports.articles)
                    
                    const q = query(collection(db, "Bookmarks"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        const temp={...doc.data(),id:doc.id}
                        setBookmark(temp)
                      });
                } catch (error) {
                    setLoading(false);
                }
            
            }())
        }
      
    },[user])
    return(
          <div className="md:w-[700px] bg-gradient-to-r from-blue-200 to-green-300  w-[700px] mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 " >
            <div className="md:w-[800px] bg-white w-[90%] z-10 dark:bg-gray-700  text-lg sticky  border-4 shadow-2xl top-14 h-12 font-bold flex mt-5 justify-between rounded-tr-lg rounded-tl-lg">
                      <button onClick={() => setSection("all")} className={`${section=="all"?"bg-blue-300":"bg-white"} w-[17%] border-r-2  border-gray-600`}>All</button>
                      <button onClick={()=> setSection("business")} className={`${section=="business"?"bg-blue-300":"bg-white"} w-[17%]  border-r-2 border-gray-600`}>Business</button>
                      <button onClick={()=> setSection("entertainment")} className={`${section=="entertainment"?"bg-blue-300":"bg-white"} w-[23%]  border-r-2 border-gray-600`}>Entertainment</button>
                      <button onClick={()=> setSection("sports")} className={`${section=="sports"?"bg-blue-300":"bg-white"} w-[17%]  border-r-2 border-gray-600`}>Sports</button>
                      <button onClick={() => setSection("bookmarks")} className={`${section=="bookmarks"?"bg-blue-300":"bg-white"} w-[17%]   border-gray-600`}>Bokmarks</button>
                      {/* <button className="w-[20%] ">Sport</button> */}
            </div>
                {
                    loading?<NewsLoading/>:(
                        <div className="flex flex-col items-center justify-start min-h-[90vh] gap-4">
                        {
                            section==="all"&&(news.map((data)=> data.urlToImage&&<NewsComponent key={data.title} data={data} section={section} />))
                        }
                        {
                            section==="business"&&(
                                businessnews.length>0?businessnews.map((data)=> data.urlToImage&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Empty</div>)
                        }
                        {
                            section==="entertainment"&&(
                                entertainmentnews.length>0?entertainmentnews.map((data)=> data.urlToImage&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Empty</div>)
                        }
                        {
                            section==="sports"&&(
                                sportsnews.length>0?sportsnews.map((data)=> data.urlToImage&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold">Empty</div>)
                        }
                        {
                            section==="bookmarks"&&(
                                bookmark.length>0?bookmark.map((data)=> data.urlToImage&&<NewsComponent key={data.title} data={data} section={section} />):<div className="mt-10 text-2xl font-bold text-green-600">No Item in your Bookmarks</div>)
                        }
                    </div>
                    )
                }
            </div>
                
                
          </div>
    )
}
