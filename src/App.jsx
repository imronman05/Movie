import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Navigation from './components/Navbar/Navigation';
import LoadingNav from './components/Navbar/LoadingNav'
import Login from './components/Modal/Login'
import Sign from './components/Modal/Sign'
import SettingUser from './components/Modal/SettingUser'
import Hero from './components/HeaderSection/Hero'
import LoadingHero from './components/HeaderSection/Loading'
import MovieList from './components/MovieTrending/MovieList'
import LoadingMovieList from './components/MovieTrending/TrendingLoading'
import MobileMovieDetail from './components/MovieTrending/MobileDetail'
import MobileLoadDetail from './components/MovieTrending/LoadingMobileDetail'
import Footer from './components/Footer/Footer'
import { MovieDetail, moviePopuler,PopulerMovie, TrendingMovie} from './api';

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
  const [loadingPage,setLoadingPage] = useState(true)
  const [loadingMobile, setLoadingMobile] = useState(false)
  const [errorPage,setErrorPage] = useState(false)
  const [MessageErorPage, setMessageErorPage] = useState('')

  useEffect(() =>{
    setLoadingPage(true)
    moviePopuler().then(result =>{
      result.map( async(value,index) =>{
        if(index < 3) {
          const movie = await MovieDetail(value.id)
          setHeroMovie(ind => [...ind, movie])
        }
      })
    })
    .catch(err =>{
      setMessageErorPage(err.message)
      setErrorPage(true)
    })
    .finally(() =>{
      setLoadingPage(false)
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
      setLoadingMobile(true)
      MovieDetail(idMovieMobile).then(result =>{
        setMovieDetail(result)
      })
      .catch(err =>{
        console.log(err)
      })
      .finally(() =>{
        setLoadingMobile(false)
      })
    }
  },[idMovieMobile])

  window.onscroll =() =>{
    if(window.pageYOffset > 10 ){
      setNavScrol('wrapNavbar backdrop-blur bg-black/30 border-b')
      if(mobileShowDetail){
        const buttonMovie = document.querySelectorAll('.buttonMovie')
        buttonMovie.forEach((value)=>{
            value.classList.remove('flex')
            value.classList.add('hidden')
        })
        setMobileShowDetail(false)
      }
    }else{
      setNavScrol('wrapNavbar')
    }
  }

  
  return (
    <div>
      {loadingPage ? 
      <>
      <div className={navScrol}>
        <LoadingNav />
      </div>
        <LoadingHero />
        <LoadingMovieList weekDay={true}/>
        <LoadingMovieList weekDay={false}/>
        <Footer />
      </>
      :
      <>
      {errorPage ? <h1 className='text-white'>{MessageErorPage}</h1> 
      : 
      <>
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
            <MovieList listMovie={listSearchMovie} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile}/> 
          : 
            <h1 className='text-center text-white text-3xl'>{messageError}!</h1>
          }
        </div>
        :
        <>
        <div className='min-h-[18rem] md:min-h-[34rem] lg:min-h-screen'>
          <Hero movie={heroMovie} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile}/>
        </div>
        <MovieList menu={setTranding} listMovie={trandingMovie} title={'TRENDING'} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile} id={'Tranding'} />
        <MovieList listMovie={populerMovie} title={'ALL MOVIE'} mobileShow={setMobileShowDetail} idMobile={setIdMovieMobile} id={'All_Movie'}/>
        
        <Footer />
        </>
      }
        </>
        }
      </>
      }
      {mobileShowDetail && 
        <>
        {loadingMobile ? 
            <MobileLoadDetail closeMobileDetail={setMobileShowDetail}/>
            :
            <MobileMovieDetail closeMobileDetail={setMobileShowDetail} mobileDetail={movieDetail}/>
        }
        </>
      }
      </>
    }
      </div>
  )
}

export default App