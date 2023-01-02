import React, { useState,} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieDetail, ImageActor} from './../../api'
import { BsFillPlayCircleFill } from 'react-icons/bs';
import "swiper/css";
import 'swiper/css/virtual';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, Virtual,FreeMode} from "swiper";
import DetailMovie from './MovieDetail';
import LoadingDetail from './LoadingDetail';

const MovieTrending = (props) => {
  const [buttonTrending1] = useState('buttonTrending bg-[#E50914]');
  const [buttonTrending2] = useState('buttonTrending');
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState([])
  const [imageActor, setImageActor] = useState([])
  const [loadingDetail, setLoadingDetail] = useState(false)

  const button1 = () =>{
    props.menu('day')
    const buttonMovie = document.querySelectorAll('.buttonTrending')
    buttonMovie.forEach((value)=>{
      value.classList.remove('bg-[#E50914]')
      event.target.classList.add('bg-[#E50914]')
    })

    closeBannerDetail()
  }

  const button2 = () =>{
    props.menu('week')
    const buttonMovie = document.querySelectorAll('.buttonTrending')
    buttonMovie.forEach((value)=>{
      value.classList.remove('bg-[#E50914]')
      event.target.classList.add('bg-[#E50914]')
    })

    closeBannerDetail()
  }

  const movieClick = (event) =>{
    const buttonMovie = document.querySelectorAll('.buttonMovie')
    buttonMovie.forEach((value)=>{
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
      setLoadingDetail(true)
      setTimeout(() =>{
      MovieDetail(event.target.dataset.id).then(result =>{
        setMovieDetail(result)
      })
      ImageActor(event.target.dataset.id).then(actor =>{
          setImageActor(actor)
      })
      setLoadingDetail(false)
    },2000)
      setShowMovieDetail(true)
    }
  }

  return (
    <div className='container px-4 lg:px-24 lg:mb-10 md:mx-auto md:px-9' id={props.id}>
      <div>
      {props.title && 
        <div className='flex mt-5 md:mt-10 md:pb-3 border-b border-white/[.40] mb-3 lg:mb-5 md:mb-0'>
          <h1 className='font-semibold leading-relaxed text-lg md:text-4xl text-white md:pl-3'>{props.title}</h1>  
          {props.menu && 
              <div className='mx-10 lg:mx-80 md:mx-20 flex md:items-center border border-[#E50914] rounded-full mb-2 md:mb-0'>
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
        className="mySwiper lg:px-3 mb-4"
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
          {loadingDetail ? 
          <LoadingDetail closeMovieDetail={setShowMovieDetail} />
          :
          <DetailMovie showMovieDetail={setShowMovieDetail} movieDetail={movieDetail} imageActor={imageActor} closeMovieDetail=         {setShowMovieDetail}/> 
          }
        </div>}
      </div>
    </div>
  )
}

export default MovieTrending
