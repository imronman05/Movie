import React from 'react'

const TrendingLoading = (props) => {
    return (
        <div className='container px-4 lg:px-24 lg:mb-10 md:mx-auto md:px-9 animate-pulse'>
            <div className='flex gap-8 lg:gap-72 md:gap-12 mt-5 md:mt-10 md:pb-3 border-b border-white/[.40] pb-2 mb-3 lg:mb-5 md:mb-8'>
                <section className='bg-zinc-600 py-4 px-10 md:py-5 md:px-20 rounded-full md:ml-3'></section>
                {props.weekDay && 
                    <div className='flex gap-1 md:gap-2'>
                        <section className='bg-zinc-600 py-4 px-7 md:py-5 md:px-12 rounded-full'></section>
                        <section className='bg-zinc-600 py-4 px-7 md:py-5 md:px-12 rounded-full'></section>
                    </div>
                }
            </div>
            <div className='flex gap-3 md:gap-6 md:px-1 lg:px-3 mb-4'>
                <section className='bg-zinc-600 py-[21%] px-[15.5%] md:px-[11.3%] md:py-[15%] lg:py-36 lg:px-[9.2%] rounded-md'></section>
                <section className='bg-zinc-600 py-[21%] px-[15.5%] md:px-[11.3%] md:py-[15%] lg:py-36 lg:px-[9.2%] rounded-md'></section>
                <section className='bg-zinc-600 py-[21%] px-[15.5%] md:px-[11.3%] md:py-[15%] lg:py-36 lg:px-[9.2%] rounded-md'></section>
                <section className='bg-zinc-600 py-[21%] px-[15.5%] md:px-[11.3%] md:py-[15%] lg:py-36 lg:px-[9.2%] rounded-md hidden md:block'></section>
                <section className='bg-zinc-600 py-[21%] px-[15.5%] md:px-[11.3%] md:py-[15%] lg:py-36 lg:px-[9.2%] rounded-md hidden lg:block'></section>
            </div>
        </div>
    )
}

export default TrendingLoading