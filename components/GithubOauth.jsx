
export default function GithubOauth()
{
    async function handleGithubOauth()
    {
       alert("pressed");  
    }
    return (
        <button onClick={handleGithubOauth} className="flex items-center gap-2 p-1 text-white bg-black border border-gray-300 rounded-md"> 
            <img src="./github.png" alt="google" width={40} height={40} className="ml-4"/>
            <span>Continue with Github</span>
        </button> 
    )
}