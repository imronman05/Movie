import React from 'react'

const LoadingNav = () => {
    return (
        <div className='w-screen py-3 animate-pulse'>
            <div className='flex gap-2 justify-between ml-5 mr-5 md:ga-5 md:ml-6 md:mr-6 lg:ml-14 lg:mr-14'>
                <section className='block py-2 px-4 rounded-full bg-zinc-600 md:py-4 md:w-[8%] lg:hidden'></section>
                <section className='bg-zinc-600 py-4 px-8 rounded-full md:w-[15%]'></section>
                <div className='hidden w-[18%] justify-between gap-4 lg:flex'>
                    <section className='bg-zinc-600 py-4 w-[50%] rounded-full'></section>
                    <section className='bg-zinc-600 py-4 w-[50%] rounded-full'></section>
                </div>
                <div className=' w-full flex gap-4 justify-end lg:w-[30%] lg:justify-between'>
                    <section className='bg-zinc-600 py-4 w-[40%] rounded-full'></section>
                    <section className='bg-zinc-600 py-4 w-[50%] rounded-full hidden lg:block'></section>
                    <section className='bg-zinc-600 py-4 w-[50%] rounded-full hidden lg:block'></section>
                </div>
            </div>
        </div>
    )
}

export default LoadingNav
