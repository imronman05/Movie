import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineArrowDown,AiFillStar } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import "swiper/css";
import 'swiper/css/virtual';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Virtual, Autoplay } from "swiper";

const App = (props) => {
  const upBanner = (event) =>{
    if(event.target.dataset.id == undefined){
      alert('tolong tunggu sebentar atau refrash ulang')
    }else {
      props.mobileShow(true)
      props.idMobile(event.target.dataset.id)
    }
  }

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Virtual, Pagination,Autoplay]}
        className="mySwiper"
      >
        {props.movie.map((value,index) =>{
          if(index < 3){
        return <SwiperSlide key={index} virtualIndex={index}>
                  <div style={{backgroundImage: `url('${import.meta.env.VITE_IMGURL}/${value.backdrop_path}')`}} className='min-h-[18rem] md:min-h-[34rem] w-screen bg-cover bg-center bg-no-repeat relative md:bg-left-md lg:min-h-screen' id="hero">
                    
                    <div className='min-h-full bg-black/30 absolute w-full flex items-end justify-center md:relative md:min-h-[34rem] md:bg-gradient-to-r md:from-black/90 md:to-white/10 md:items-center md:justify-start lg:min-h-screen'>
                        <div className='relative -top-8 md:top-5 md:w-[65%] md:left-[3.8%] lg:w-[50%]'>
                            <div className='text-slate-50 flex flex-col justify-center'>
                              <div className="flex flex-col-reverse items-center gap-2 md:gap-0 md:flex-col md:items-start">
                                <ul className="text-[11px] md:text-base flex gap-3 md:gap-5 items-center justify-start mb-1 md:-ml-2">
                                      {value.genres.map((val,ind) =>{
                                        if(ind == value.genres.length -1 && window.innerWidth < 768){
                                          return <li key={ind} className=' md:text-teal-400 md:bg-black/10 md:backdrop-brightness-50 md:rounded-tr-lg md:rounded-bl-lg md:px-2'>{val.name}</li>
                                        }else if(window.innerWidth > 768){
                                          return <li key={ind} className=' md:text-teal-400 md:bg-black/10 md:backdrop-brightness-50 md:rounded-tr-lg md:rounded-bl-lg md:px-2'>{val.name}</li>
                                        }else{
                                          return <li key={ind} className=' md:text-teal-400 md:bg-black/10 md:backdrop-brightness-50 md:rounded-tr-lg md:rounded-bl-lg md:px-2'>{val.name} |</li>
                                        }
                                      })}
                                </ul>
                                <h1 className='text-center text-3xl font-extrabold drop-shadow-2xl md:text-3xl  lg:text-4xl lg:mt-0 font-Roboto tracking-wider'>{value.original_title}</h1>
                              </div>
                                <div className="hidden md:flex md:gap-5 md:mt-2">
                                  <div className='md:flex md:items-center md:text-lg lg:mt-0'><AiFillStar /> <h1 className='ml-1'>{value.vote_average.toString().substring(0,3)}</h1></div>
                                  <div className='md:flex md:items-center md:text-lg lg:mt-0'>
                                    <BiCalendar />
                                    <h1 className="ml-1">{value.release_date.substring(0,4)}</h1>
                                  </div>
                                  <div className='md:flex md:items-center md:text-lg lg:mt-0'>
                                    <BiTimeFive />
                                    <h1 className="ml-1">{parseInt(Math.floor(value.runtime / 60))}H {parseInt(Math.floor(value.runtime % 60))}M</h1>
                                  </div>
                                </div>
                                <p className='hidden font-Source md:block md:tracking-wide md:text-slate-200 md:text-xl opacity-90 md:h-28 md:overflow-hidden lg:text-1xl md:mt-5'>{value.overview.split('.')[0]}</p>
                                <button className='hidden md:border-2 md:border-teal-400 md:w-24 md:py-2 md:flex md:items-center md:justify-center md:mt-5 text-1xl hover:bg-teal-400 transition-all duration-300'> <BsFillPlayFill  className='md:text-2xl'/> Play</button>
                            </div>
                            <div className='z-50 py-3 -mt-2 flex items-center justify-center text-slate-50 text-3xl md:hidden' onClick={upBanner} data-id={value.id}>
                                <AiOutlineArrowDown data-id={value.id}/>
                            </div>
                        </div>
                    </div>
                </div>
                </SwiperSlide>
            }
        })}
      </Swiper>
    </>
  );
}

export default App
