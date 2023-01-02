import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

const LoadingMobileDetail = (props) => {
    
    const closePlayButton = () =>{
        const buttonMovie = document.querySelectorAll('.buttonMovie')
        buttonMovie.forEach((value)=>{
            value.classList.remove('flex')
            value.classList.add('hidden')
        })
        props.closeMobileDetail(false)
    }

  return (
    <div className='w-full min-h-[20rem] bg-zinc-700 fixed inset-x-0 bottom-0 z-10 md:hidden text-white overflow-scroll rounded-t-lg'>
        <div className='animate-pulse'>
            <div className='relative'>
                <AiOutlineCloseCircle className='absolute z-10 top-1 right-1 text-slate-50 text-3xl cursor-pointer' onClick={closePlayButton} />
            </div>
            <div className='flex gap-3 p-3'>
                <div className=' w-[50%]'>
                    <section className='bg-zinc-600 px-2 py-20 rounded-md'></section>
                </div>
                <div className=' w-full flex flex-col gap-3'>
                    <section className='bg-zinc-600 w-[85%] py-3 rounded-md'></section>
                    <div className='flex gap-3'>
                        <section className='bg-zinc-600 w-[23%] py-2 rounded-md'></section>
                        <section className='bg-zinc-600 w-[23%] py-2 rounded-md'></section>
                        <section className='bg-zinc-600 w-[23%] py-2 rounded-md'></section>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <section className='bg-zinc-600 w-[85%] py-2 rounded-md'></section>
                        <section className='bg-zinc-600 w-[85%] py-2 rounded-md'></section>
                        <section className='bg-zinc-600 w-[85%] py-2 rounded-md'></section>
                        <section className='bg-zinc-600 w-[85%] py-2 rounded-md'></section>
                    </div>
                </div>
            </div>
            <div className='h-full mt-5'>
                <section className='mx-auto bg-zinc-600 w-[23%] py-10 rounded-full'></section>
            </div>
        </div>
    </div>
  )
}

export default LoadingMobileDetail
