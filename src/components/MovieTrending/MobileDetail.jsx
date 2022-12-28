import React from 'react'
import { AiOutlineCloseCircle,AiFillStar } from 'react-icons/ai';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import { BsFillPlayCircleFill } from 'react-icons/bs';


const MobileDetail = (props) => {

    const closePlayButton = () =>{
        const buttonMovie = document.querySelectorAll('.buttonMovie')
        buttonMovie.forEach((value)=>{
            value.classList.remove('flex')
            value.classList.add('hidden')
        })
        props.closeMobileDetail(false)
    }

    return(
        <div className='w-full max-h-96 bg-[#161e2e] fixed inset-x-0 bottom-0 z-10 md:hidden text-white overflow-scroll rounded-t-lg'>
            <div className='relative'>
                <AiOutlineCloseCircle className='absolute z-10 top-1 right-1 text-slate-50 text-3xl cursor-pointer' onClick={closePlayButton} />
            </div>
            <div className='p-3 flex gap-3 '>
                <div className='w-[45%] h-fit'>
                    <img src={`${import.meta.env.VITE_IMGURL}/${props.mobileDetail.poster_path}`} alt="" className='rounded-lg max-w-full'/>
                </div>
            <div className='w-full'>
                <h1 className='w-[80%] text-md font-semibold tracking-wider'>{props.mobileDetail.original_title}</h1>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center text-amber-400 text-sm'>
                        <AiFillStar />
                        <h1 className='ml-1'>{String(props.mobileDetail.vote_average).substring(0,3)}</h1>
                    </div>
                <div className='flex items-center text-sm'>
                    <BiCalendar />
                    <h1 className="ml-1">{String(props.mobileDetail.release_date).substring(0,4)}</h1>
                </div>
                <div className='flex items-center text-sm'>
                    <BiTimeFive />
                    <h1 className="ml-1">{parseInt(Math.floor(props.mobileDetail.runtime / 60))}h {parseInt(Math.floor(props.mobileDetail.runtime % 60))}m</h1>
                </div>
                </div>
                <p className='mt-2 h-36 text-slate-200 opacity-90 font-Source overflow-ellipsis overflow-hidden'>{String(props.mobileDetail.overview).split('.')[0]}</p>
            </div>
            </div>
                <div className=''>
                <BsFillPlayCircleFill className='mx-auto text-white text-5xl bg-black rounded-full'/>
                <p className='text-center mt-2'>Play</p>
                </div>
        </div>
    )
}

export default MobileDetail
