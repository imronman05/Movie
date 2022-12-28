import React from 'react'
import Actor from './Actor'
import { AiOutlineCloseCircle,AiFillStar } from 'react-icons/ai';
import { BsFillPlayCircleFill } from 'react-icons/bs';


const MovieDetail = (props) => {
    const closeBannerDetail = () =>{
        const buttonMovie = document.querySelectorAll('.buttonMovie')
        buttonMovie.forEach((value)=>{
            value.classList.remove('flex')
            value.classList.add('hidden')
        })
    
        props.closeMovieDetail(false)
    }

    return (
    <div className='relative md:h-[75%] lg:h-full bg-cover bg-no-repeat w-full rounded-lg overflow-hidden'style={{backgroundImage: `url('${import.meta.env.VITE_IMGURL}/${props.movieDetail.backdrop_path}')`}}>
        <AiOutlineCloseCircle className='absolute z-10 top-3 right-3 text-slate-50 text-3xl cursor-pointer' onClick={closeBannerDetail} />
            <div className='w-full h-full absolute bg-gradient-to-r from-black to-white/10 flex'>
                <div className='md:w-[60%] lg:w-[50%] flex flex-col justify-center pl-5'>
                    <ul className="flex gap-5 items-center justify-start mb-1 -ml-2">
                        {props.movieDetail.genres?.map((val,ind) =>{
                            return <li key={ind} className='md:text-sm text-teal-400 bg-black/10 backdrop-brightness-50 rounded-tr-lg rounded-bl-lg px-2'>{val.name}</li>
                        })}
                    </ul>
                    <div className=' flex gap-3'>
                        <div className='flex items-center text-amber-400 md:text-sm'>
                        <AiFillStar />
                        <h1 className='md:text-sm md:ml-1'>{String(props.movieDetail.vote_average).substring(0,3)}</h1>
                        </div>
                        <h1 className='text-white md:text-sm'>{parseInt(Math.floor(props.movieDetail.runtime / 60))}H {parseInt(Math.floor(props.movieDetail.runtime % 60))}M</h1>
                    </div>
                        <h1 className='md:text-2xl lg:text-4xl font-semibold text-white drop-shadow-2xl'>{props.movieDetail.original_title}</h1>
                        <p className='text-slate-200 md:text-md lg:text-xl opacity-90 mt-5 mb-5 font-Source'>{String(props.movieDetail.overview).split('.')[0]}</p>
                        <Actor actorImage={props.imageActor}/>
                </div>
                <div className='flex items-center justify-center w-[50%]'>
                    <BsFillPlayCircleFill className='text-white text-6xl bg-black rounded-full'/>
                </div>
            </div>
    </div>
    )
}

export default MovieDetail
