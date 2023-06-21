"use client"
import { Bookmark } from "phosphor-react"
import { useStore } from "@/lib/useStore"
import { db } from "@/Firebase/firebaseconfig";
import { doc,deleteDoc,collection, query, where, setDoc,addDoc } from "firebase/firestore"; 
import { Toaster, toast } from "react-hot-toast";
export default function NewsComponent({data,section})
{
    const {user,bookmark,setBookmark,filterBookmark}=useStore();
    const bookmarkedStatus=alreadyBookmarked();
    function alreadyBookmarked()
    {
        for(let i of bookmark)
        {
            if(i.title===data.title)
            {
                return true;
            }
        }
        return false;
    }
    async function addToBookmark()
    {
        try {
            if(bookmarkedStatus==false)
            {
                const docRef = await addDoc(collection(db, "Bookmarks"), {
                    userId:user.uid,
                    author:data.author,
                    content:data.content,
                    description:data.description,
                    publishedAt:data.publishedAt,
                    title:data.title,
                    url:data.url,
                    urlToImage:data.urlToImage
                 }); 
                 setBookmark({...data,id:docRef._key.path.segments[1]});
                 toast.success("Added to bookmark")
            }
            else{
                toast.error("Already in bookmark")
                
            }
           
        } catch (error) {
             console.log(error);
        }     
    }
    async function removeFromBookmark()
    {
        try {
            const x=await deleteDoc(doc(db, "Bookmarks", data.id));
            console.log(x);
            filterBookmark(data.id)
            toast.success("Removed from Bookmark")
        } catch (error) {
             toast.error("error removing from bookmark")   
             console.log(error)
        }
       
    }
    return(
        <div className="w-[90%] max-w-[500px] dark:shadow-md dark:shadow-gray-600 dark:bg-[#333] md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md bg-white rounded-md p-3 flex flex-col md:w-[60%] md:flex-row gap-2">
            <Toaster reverseOrder position="top-center" />
            <div className="w-full h-full mx-auto">
                <img className=" rounded-md md:w-[400px] mx-auto md:h-[200px] bg-contain h-[200px]" src={data.urlToImage} alt="imagetitle" />
            </div>
            <div className="relative px-1 pb-10 md:pb-10"> 
                <h2 className="font-bold" dangerouslySetInnerHTML={{__html:`${data.title}`}}></h2>
                <p className="inline text-sm">{data.description}</p>
                <a target="blank" className="inline ml-4 text-blue-700 underline" href={data.url}>Read more-&gt;</a>
                {/* <span className="block mb-2 font-semibold text-end">{data.publishedAt.slice(0,10)}</span> */}
                <span className="block mb-2 font-semibold text-end">Author: &nbsp;{data.author}</span>
                {
                    section!="bookmarks"&&(
                        <div onClick={addToBookmark} className="absolute bottom-0 right-0 flex gap-1 p-1 text-white bg-blue-500 rounded-md cursor-pointer ">
                            <span className="font-semibold">{bookmarkedStatus?"Already in Bookmark":"Add to Bookmark"}</span>
                            <Bookmark  className="text-white cursor-pointer dark:text-white" size={25} weight={bookmarkedStatus?"fill":"bold"} />     
                        </div>
                    )
                }
                {
                    section==="bookmarks"&&(
                        <div onClick={removeFromBookmark} className="absolute  bottom-0 right-0 flex w-[250px] justify-center gap-1 p-2 mt-6 text-white bg-red-700 rounded-md cursor-pointer ">
                            <span className="font-semibold">Remove from Bookmark</span>
                            <Bookmark  className="text-white cursor-pointer dark:text-white" size={25} weight={bookmarkedStatus?"fill":"bold"} />     
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}
