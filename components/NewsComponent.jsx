"use client"
import { Bookmark } from "phosphor-react"
import { useStore } from "@/lib/useStore"
import { db } from "@/Firebase/firebaseconfig";
import { doc,deleteDoc,collection, query, where, setDoc,addDoc } from "firebase/firestore"; 
import { Toaster, toast } from "react-hot-toast";
export default function NewsComponent({data,section})
{
    // console.log(data)
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
                    category:data.category,
                    author:data.author,
                    description:data.description,
                    published_at:data.published_at,
                    title:data.title,
                    url:data.url,
                    image:data.image,
                    source:data.source
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
        <div className="w-[90%] border max-w-[500px] dark:shadow-md text-black md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md border-gray-300 bg-white rounded-md p-3 flex flex-col md:w-[60%] md:flex-row gap-2">
            <Toaster reverseOrder position="top-center" />
            <div className="">
                <img className="md:min-w-[200px] md:h-[100px] w-[400px]  rounded-md" src={data.image} alt="imagetitle" />
            </div>
            <div className="relative px-1 pb-10 md:pb-10"> 
                <h2 className="font-bold" dangerouslySetInnerHTML={{__html:`${data.title}`}}></h2>
                <p className="inline text-sm">{data.description}</p>
                <a target="blank" className="inline ml-4 text-blue-700 underline" href={data.url}>Read more-&gt;</a>
                {/* <span className="block mb-2 font-semibold text-end">{data.publishedAt.slice(0,10)}</span> */}
                <span className="block mb-2 font-semibold text-end">Source: &nbsp;{data.source}</span>
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
                        <div onClick={removeFromBookmark} className="absolute  bottom-0 right-0 flex w-[250px] justify-center gap-1 p-1 mt-6 text-white bg-red-600 rounded-md cursor-pointer ">
                            <span className="font-semibold">Remove from Bookmark</span>
                            <Bookmark  className="text-white cursor-pointer dark:text-white" size={25} weight={bookmarkedStatus?"fill":"bold"} />     
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}
