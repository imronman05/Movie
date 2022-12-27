import React, { useState,} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieDetail, ImageActor} from './../../api'
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiOutlineCloseCircle,AiFillStar } from 'react-icons/ai';
import "swiper/css";
import 'swiper/css/virtual';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, Virtual,FreeMode} from "swiper";

const MovieTrending = (props) => {
  const [buttonTrending1] = useState('buttonTrending bg-[#E50914]');
  const [buttonTrending2] = useState('buttonTrending');
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState([])
  const [imageActor, setImageActor] = useState([])

  const button1 = () =>{
    props.menu('day')
    const buttonMovie = document.querySelectorAll('.buttonTrending')
    buttonMovie.forEach((value,ind)=>{
      value.classList.remove('bg-[#E50914]')
      event.target.classList.add('bg-[#E50914]')
    })

    closeBannerDetail()
  }

  const button2 = () =>{
    props.menu('week')
    const buttonMovie = document.querySelectorAll('.buttonTrending')
    buttonMovie.forEach((value,ind)=>{
      value.classList.remove('bg-[#E50914]')
      event.target.classList.add('bg-[#E50914]')
    })

    closeBannerDetail()
  }

  const movieClick = (event) =>{
    const buttonMovie = document.querySelectorAll('.buttonMovie')
    buttonMovie.forEach((value,ind)=>{
      value.classList.remove('flex')
      value.classList.add('hidden')
    })
    
    const nextSibling = event.target.nextElementSibling;
      nextSibling.classList.remove('hidden')
      nextSibling.classList.add('flex')

    if(window.innerWidth < 768){
      props.mobileShow(true)
      props.idMobile(event.target.dataset.id)
    }else{
    MovieDetail(event.target.dataset.id).then(result =>{
      setMovieDetail(result)
    })
    ImageActor(event.target.dataset.id).then(actor =>{
          setImageActor(actor)
        })
      setShowMovieDetail(true)
    }
  }

  const closeBannerDetail = () =>{
    const buttonMovie = document.querySelectorAll('.buttonMovie')
    buttonMovie.forEach((value,ind)=>{
      value.classList.remove('flex')
      value.classList.add('hidden')
    })

    setShowMovieDetail(false)
  }

  const Actor = () =>{
    return(
    <Swiper
        slidesPerView={5}
        spaceBetween={15}
        freeMode={true}
        modules={[Virtual,FreeMode]}
        breakpoints={{
          768: {
            spaceBetween: 0
          },
          1024: {
            spaceBetween: 15
          }
        }}
        className="mySwiper w-[100%] "
        >
          {imageActor?.map((value,index) =>{
            if(index < 10 && value.profile_path != null){
            return (
            <SwiperSlide key={index} virtualIndex={index}>
              <img src={`${import.meta.env.VITE_IMGURL}/${value.profile_path}`} alt="" className='rounded-lg md:w-[80%] lg:w-full'/>
            </SwiperSlide>)
            }
          })}
        </Swiper>
    )
  }

  const DetailMovie = () =>{
            return (<div className='relative md:h-[75%] lg:h-full bg-cover bg-no-repeat w-full rounded-lg overflow-hidden'style={{backgroundImage: `url('${import.meta.env.VITE_IMGURL}/${movieDetail.backdrop_path}')`}}>
                <AiOutlineCloseCircle className='absolute z-10 top-3 right-3 text-slate-50 text-3xl cursor-pointer' onClick={closeBannerDetail} />
                <div className='w-full h-full absolute bg-gradient-to-r from-black to-white/10 flex'>
                  <div className='md:w-[60%] lg:w-[50%] flex flex-col justify-center pl-5'>
                    <ul className="flex gap-5 items-center justify-start mb-1 -ml-2">
                                          {movieDetail.genres?.map((val,ind) =>{
                                            return <li key={ind} className='md:text-sm text-teal-400 bg-black/10 backdrop-brightness-50 rounded-tr-lg rounded-bl-lg px-2'>{val.name}</li>
                                          })}
                    </ul>
                    <div className=' flex gap-3'>
                      <div className='flex items-center text-amber-400 md:text-sm'>
                        <AiFillStar />
                        <h1 className='md:text-sm md:ml-1'>{String(movieDetail.vote_average).substring(0,3)}</h1>
                      </div>
                      <h1 className='text-white md:text-sm'>{parseInt(Math.floor(movieDetail.runtime / 60))}H {parseInt(Math.floor(movieDetail.runtime % 60))}M</h1>
                    </div>
                      <h1 className='md:text-2xl lg:text-4xl font-semibold text-white drop-shadow-2xl'>{movieDetail.original_title}</h1>
                      <p className='text-slate-200 md:text-md lg:text-xl opacity-90 mt-5 mb-5 font-Source'>{String(movieDetail.overview).split('.')[0]}</p>
                      <Actor />
                    </div>
                    <div className='flex items-center justify-center w-[50%]'>
                      <BsFillPlayCircleFill className='text-white text-6xl bg-black rounded-full'/>
                    </div>
                  </div>
                </div>
            )
  }

  return (
    <div className='container px-4 lg:px-24 lg:mb-10 md:mx-auto md:px-9' id={props.id}>
      <div>
      {props.title && 
        <div className='flex mt-5 md:mt-10 md:pb-3 border-b border-white/[.40] mb-3 lg:mb-5 md:mb-0'>
          <h1 className='font-Source font-semibold leading-relaxed text-lg md:text-4xl text-white md:pl-3'>{props.title}</h1>  
          {props.menu && 
              <div className='mx-10 lg:mx-80 md:mx-20 flex md:items-center border border-[#E50914] rounded-full'>
                <button className={buttonTrending1} onClick={button1} value={'Day'} >Day</button>
                <button className={buttonTrending2} onClick={button2} value={'Week'} >Week</button>
              </div>
            }
        </div>
        }
        <Swiper
        slidesPerView={3}
        spaceBetween={15}
        freeMode={true}
        navigation={true}
        modules={[Virtual,Navigation,FreeMode]}
        className="mySwiper lg:px-3"
        breakpoints={{
          768: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 5
          }
        }}
        >
        {props.listMovie.map((value,index) =>{
          if(value.backdrop_path != null){
          return  <SwiperSlide key={index} virtualIndex={index} className='md:h-72 lg:h-80 flex justify-center relative md:items-center lg:items-start'>
                    <img src={`${import.meta.env.VITE_IMGURL}/${value.poster_path}`} alt="" className='rounded-lg lg:h-full w-full md:h-[80%]' onClick={movieClick} data-id={value.id}/>
                    <div className='hidden absolute md:h-[80%] lg:h-full w-full border-2 items-center justify-center rounded-lg buttonMovie transition-all duration-300 bg-black/50'>
                        <BsFillPlayCircleFill className='text-white text-6xl bg-black rounded-full'/>
                    </div>
                  </SwiperSlide>
          }
        })}
        </Swiper>
        {showMovieDetail && 
        <div className='hidden md:block h-[35rem] w-full mt-12 lg:px-3 md:px-0 md:-mb-32 lg:mb-0'>
          <DetailMovie />
        </div>}
      </div>
    </div>
  )
}

export default MovieTrending
