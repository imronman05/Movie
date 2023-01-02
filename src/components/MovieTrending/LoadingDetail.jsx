import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

const LoadingDetail = (props) => {

    const closeBannerDetail = () =>{
        const buttonMovie = document.querySelectorAll('.buttonMovie')
        buttonMovie.forEach((value)=>{
            value.classList.remove('flex')
            value.classList.add('hidden')
        })
    
        props.closeMovieDetail(false)
    }

  return (
    <div className='relative h-[25em] lg:h-full bg-zinc-700 rounded-lg flex items-center animate-pulse'>
        <AiOutlineCloseCircle className='absolute z-10 top-3 right-3 text-slate-50 text-3xl cursor-pointer' onClick={closeBannerDetail}/>
        <div className='w-[50%] ml-5'>
            <ul className='flex gap-3 md:gap-5 lg:gap-3 mb-1'>
                <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
                <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
                <li className='py-2 px-7 bg-zinc-600 rounded-full text-white md:py-3 md:px-6 lg:px-10'></li>
            </ul>
            <div className='flex gap-3 md:gap-5 lg:gap-3'>
                <section className='bg-zinc-600 md:px-8 lg:px-9 py-3 rounded-full'></section>
                <section className='bg-zinc-600 md:px-8 lg:px-9 py-3 rounded-full'></section>
            </div>
            <section className='bg-zinc-600 py-4 px-12 md:py-3 rounded-full mt-4 mb-7'></section>
            <div className='flex flex-col gap-2 mb-4'>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
                <section className='bg-zinc-600 px-12 py-3 rounded-full'></section>
            </div>
            <div className='flex gap-4'>
                <section className='bg-zinc-600 md:px-[11.3%] md:py-[15%] lg:py-[12.5%] lg:px-[8.8%] rounded-md'></section>
                <section className='bg-zinc-600 md:px-[11.3%] md:py-[15%] lg:py-[12.5%] lg:px-[8.8%] rounded-md'></section>
                <section className='bg-zinc-600 md:px-[11.3%] md:py-[15%] lg:py-[12.5%] lg:px-[8.8%] rounded-md'></section>
                <section className='bg-zinc-600 md:px-[11.3%] md:py-[15%] lg:py-[12.5%] lg:px-[8.8%] rounded-md'></section>
                <section className='bg-zinc-600 md:px-[11.3%] md:py-[15%] lg:py-[12.5%] lg:px-[8.8%] rounded-md'></section>
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default LoadingDetail
