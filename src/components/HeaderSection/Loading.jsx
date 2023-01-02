import React from 'react'

const Loading = () => {
  return (
    <div className='bg-zinc-800 flex items-center justify-center animate-pulse min-h-[18rem] md:justify-start md:min-h-[34rem] lg:min-h-screen'>
        <div className='relative w-[100%] p-10 md:p-0 md:left-[3.5%] lg:left-[4.5%] md:top-5 md:w-[50%] lg:w-[50%]'>
            <div className='min-w-fit flex flex-col-reverse gap-8 mt-16 md:mt-0 md:flex-col md:gap-1 lg:gap-2'>
                <ul className='flex mx-auto md:mx-0 gap-3 md:gap-5 lg:gap-3'>
                    <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
                    <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
                    <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
                </ul>
                    <section className='bg-zinc-600 py-3 px-12 md:py-3 rounded-full'></section>
            </div>
            <div className='hidden md:block md:mb-5 md:mt-1 lg:mt-3 lg:mb-10'>
                <div className='flex gap-3 md:gap-5 md:mb-4 mt-2 lg:mb-8 lg:gap-3'>
                    <section className='bg-zinc-600 md:px-8 lg:px-12 py-3 rounded-full'></section>
                    <section className='bg-zinc-600 md:px-8 lg:px-12 py-3 rounded-full'></section>
                    <section className='bg-zinc-600 md:px-8 lg:px-12 py-3 rounded-full'></section>
                </div>
                <div className='hidden md:flex flex-col gap-5 md:gap-2 lg:gap-5'>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                </div>
            </div>
            <div className='bg-zinc-600 py-5 w-[20%] mx-auto mt-8 md:mx-0 md:w-[25%] rounded-full md:block md:py-5 lg:py-7'></div>
        </div>
    </div>
  )
}

export default Loading
