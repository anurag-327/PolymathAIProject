"use client"
import { Bookmark } from "phosphor-react"
export default function NewsLoading()
{
    return(
        <>
        <div className="w-[80%] animate-pulse max-w-[500px] md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md bg-white rounded-md p-3 flex flex-col md:w-[60%] md:flex-row gap-2">
            <div className="w-full h-full">
                <div className="w-full bg-gray-400 rounded-md md:w-[300px] md:h-[180px] bg-contain h-[200px]"  />
            </div>
            <div className="w-full">
                <h2 className="p-4 font-bold bg-gray-400 rounded-md" ></h2>
                <p className="p-10 mt-4 text-sm bg-gray-300 rounded-md "></p>
                <h2 className="p-4 mt-4 font-bold bg-gray-400 rounded-md" ></h2> 
            </div>
        </div>
        <div className="w-[80%] animate-pulse max-w-[500px] md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md bg-white rounded-md p-3 flex flex-col md:w-[60%] md:flex-row gap-2">
            <div className="w-full h-full">
                <div className="w-full bg-gray-400 rounded-md md:w-[300px] md:h-[200px] bg-contain h-[180px]"  />
            </div>
            <div className="w-full">
                <h2 className="p-4 font-bold bg-gray-400 rounded-md" ></h2>
                <p className="p-10 mt-4 text-sm bg-gray-300 rounded-md "></p>
                <h2 className="p-4 mt-4 font-bold bg-gray-400 rounded-md" ></h2> 
            </div>
        </div>
        <div className="w-[80%] animate-pulse max-w-[500px] md:max-w-[700px] md:min-w-[650px] justify-center items-center shadow-md bg-white rounded-md p-3 flex flex-col md:w-[60%] md:flex-row gap-2">
            <div className="w-full h-full">
                <div className="w-full bg-gray-400 rounded-md md:w-[300px] md:h-[200px] bg-contain h-[180px]"  />
            </div>
            <div className="w-full">
                <h2 className="p-4 font-bold bg-gray-400 rounded-md" ></h2>
                <p className="p-10 mt-4 text-sm bg-gray-300 rounded-md "></p>
                <h2 className="p-4 mt-4 font-bold bg-gray-400 rounded-md" ></h2> 
            </div>
        </div>
        </>
    )
}
