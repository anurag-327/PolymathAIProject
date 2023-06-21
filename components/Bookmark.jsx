"use client"
import { Bookmark } from "phosphor-react"
import { useStore } from "@/lib/useStore"
export default function BookmarkComponent({data})
{
    const {bookmark,setBookmark,deleteBookmark}=useStore();
    function addToBookmark()
    {
        setBookmark(data)
    }
    return(
        <div className="w-[80%] dark:shadow-md dark:shadow-gray-600 dark:bg-[#333] max-w-[400pxpx] md:max-w-[410px] md:min-w-[350px] justify-center items-center shadow-md bg-white rounded-md p-3 flex flex-col  md:flex-col gap-2">
            <div className="w-full h-full">
                <img className="w-full rounded-md md:w-[300px] md:h-[180px] bg-cover h-[180px]" src={data.urlToImage} alt="imagetitle" />
            </div>
            <div className="relative px-1 pb-10 md:pb-10"> 
                <h2 className="font-bold" dangerouslySetInnerHTML={{__html:`${data.title}`}}></h2>
                <a target="blank" className="inline ml-4 text-blue-700 underline" href={data.url}>Read more-&gt;</a>
               
            </div>
        </div>
    )
}
