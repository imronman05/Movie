import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual,FreeMode} from "swiper";

const Actor = (props) => {
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
            {props.actorImage?.map((value,index) =>{
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

export default Actor
