import { useEffect, useState } from 'react';
import { FaFacebook,FaInstagram,FaGithub,FaLinkedin } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SiGmail } from 'react-icons/si';
import Navigation from './components/Navbar/Navigation';
import Login from './components/Modal/Login'
import Sign from './components/Modal/Sign'
import SettingUser from './components/Modal/SettingUser'
import SwiperHeader from './components/HeaderSection/Swiper'
import MovieTrending from './components/MovieTrending/MovieTrending'
import MobileMovieDetail from './components/MovieTrending/MobileDetail'
import { MovieDetail, moviePopuler,PopulerMovie, TrendingMovie} from './api';

// USER LOGIN BELUM AKURAT

function App() {
  const [login, setLogin] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [navScrol, setNavScrol] = useState('wrapNavbar');
  const [tranding, setTranding] = useState('day');
  const [trandingMovie,setTrandingMovie] = useState([])
  const [heroMovie, setHeroMovie] = useState([]);
  const [listSearchMovie, setListSearchMovie] = useState([])
  const [populerMovie, setPopulerMovie] = useState([])
  const [user,setUser] = useState(false)
  const [userSetting, setUserSetting] = useState(false)
  const [showSearchMovie, setShowSearchMovie] = useState(false)
  const [mobileShowDetail,setMobileShowDetail] = useState(false)
  const [idMovieMobile, setIdMovieMobile] = useState('')
  const [movieDetail, setMovieDetail] = useState([])
  const [errorHandle, setErrorHandle] = useState(false)
  const [messageError,setMessageError] = useState('')
  const data = JSON.parse(localStorage.getItem('user'))
  const [loading,setLoading] = useState(false)

  useEffect(() =>{
    moviePopuler().then(result =>{
      result.map( async(value,index) =>{
        if(index < 3) {
          const movie = await MovieDetail(value.id)
          setHeroMovie(ind => [...ind, movie])
        }
      })
    })
  },[])

  useEffect(() =>{
    PopulerMovie().then(result =>{
      setPopulerMovie(result)
    })
  },[])

  useEffect(() =>{
    TrendingMovie(tranding).then(valueTranding =>{
      setTrandingMovie(valueTranding)
    })
  },[tranding])

  useEffect(() =>{
    if(idMovieMobile != ''){
      MovieDetail(idMovieMobile).then(result =>{
        setMovieDetail(result)
      })
    }
  },[idMovieMobile])

  window.onscroll =() =>{
    if(window.pageYOffset > 10 ){
      setNavScrol('wrapNavbar backdrop-blur bg-black/30 border-b')
    }else{
      setNavScrol('wrapNavbar')
    }
  }

  return (
    <div>
      <div className={navScrol}>
        <Navigation login={setLogin} sign={setSignIn} showSearchMovie={setShowSearchMovie} userSetting={setUserSetting} userLogin={user} dataUser={data} userIsLogin={setUser} movieSearch={setListSearchMovie} error={setErrorHandle} errorMesangge={setMessageError} loading={setLoading}/>
      </div>

      {login && <Login modalLogin={setLogin} showSingIn={setSignIn} userLogin={setUser}/>}
      {signIn && <Sign modalSign={setSignIn} showLogin={setLogin} />}
      {userSetting && <SettingUser closeSetting={setUserSetting} dataUser={data}/>}

      {loading ? 
        <div className='absolute w-full top-20'>
        <AiOutlineLoading3Quarters className='animate-spin mx-auto text-white text-5xl'/>
        </div> 
        :
        <> 
        {showSearchMovie ? 
        <div className='absolute w-full top-20'>
          {errorHandle ? 
            <MovieTrending listMovie={listSearchMovie} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile}/> 
          : 
            <h1 className='text-center text-white text-3xl'>{messageError}!</h1>
          }
        </div>
        :
        <>
        <SwiperHeader movie={heroMovie} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile}/>
        <MovieTrending menu={setTranding} listMovie={trandingMovie} title={'TRANDING'} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile} id={'Tranding'} />
        <MovieTrending listMovie={populerMovie} title={'ALL MOVIE'} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile} id={'All_Movie'}/>
        
        <footer className='text-white flex flex-col justify-center items-center border-t border-slate-100/[.15] py-5 gap-3'>
          <div className='flex gap-4 text-lg md:text-2xl'>
            <a href="#" className='hover:text-slate-500 transition-all duration-300'><FaInstagram /></a>
            <a href="#" className='hover:text-slate-500 transition-all duration-300'><FaFacebook /></a>
            <a href="#" className='hover:text-slate-500 transition-all duration-300'><FaGithub /></a>
            <a href="#" className='hover:text-slate-500 transition-all duration-300'><SiGmail /></a>
            <a href="#" className='hover:text-slate-500 transition-all duration-300'><FaLinkedin /></a>
          </div>
            <p className='text-md md:text-lg'>2022 &copy; ImronMan</p>
        </footer>
        </>
        }
      </>
      }

      {mobileShowDetail && <MobileMovieDetail closeMobileDetail={setMobileShowDetail} mobileDetail={movieDetail}/>}
    </div>
  )
}

export default App