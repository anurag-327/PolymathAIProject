import React from 'react'

const Notification = () => {
  return (
    <div className=' w-[100%] md:w-[80%] sticky top-14 z-[100] mx-auto mt-5 bg-red-400 text-2xl text-white'><marquee width="100%"  direction="left" height="30px">
        Please make sure to unblock api call by allowing insecure content in settings.For more info  <a className='text-blue-500 underline' target='blank' href="https://github.com/anurag-327/PolymathAIProject/blob/main/README.md">Visit this</a>
    </marquee></div>
  )
}

export default Notification