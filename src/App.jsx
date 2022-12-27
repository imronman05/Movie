import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle,FaFacebook,FaInstagram,FaGithub,FaLinkedin } from 'react-icons/fa';
import { CiSettings, CiLogout } from 'react-icons/ci';
import { SiGmail } from 'react-icons/si';
import { AiOutlineCloseCircle,AiFillStar,AiOutlineClose } from 'react-icons/ai';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import Login from './components/Modal/Login'
import Sign from './components/Modal/Sign'
import SettingUser from './components/Modal/SettingUser'
import SwiperHeader from './components/HeaderSection/Swiper'
import MovieTrending from './components/MovieTrending/MovieTrending'
import { MovieDetail, moviePopuler, SearchMovie,PopulerMovie, TrendingMovie} from './api';
import {Link as LinkScroll} from 'react-scroll/modules'

function App() {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [classMenu, setClassMenu] = useState('menuMobile -left-full');
  const [navScrol, setNavScrol] = useState('wrapNavbar');
  const [tranding, setTranding] = useState('day');
  const [trandingMovie,setTrandingMovie] = useState([])
  const [heroMovie, setHeroMovie] = useState([]);
  const [listSearchMovie, setListSearchMovie] = useState([])
  const [populerMovie, setPopulerMovie] = useState([])
  const [user,setUser] = useState(false)
  const [menuUser, setMenuUser] = useState(false)
  const [userSetting, setUserSetting] = useState(false)
  const [searchMovie,setSearchMovie] = useState('')
  const [showSearchMovie, setShowSearchMovie] = useState(false)
  const [mobileShowDetail,setMobileShowDetail] = useState(false)
  const [idMovieMobile, setIdMovieMobile] = useState('')
  const [movieDetail, setMovieDetail] = useState([])
  const [errorHandle, setErrorHandle] = useState(false)
  const [messageError,setMessageError] = useState('')
  const data = JSON.parse(localStorage.getItem('user'))
  const userLogin = JSON.parse(localStorage.getItem('login'))

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

  const updateMenu = () =>{
    if(!hamburgerMenu){
      setClassMenu('menuMobile -left-0')
    }else{
      setClassMenu('menuMobile -left-full')
    }
    setHamburgerMenu(!hamburgerMenu)
  }
  const menuLogin = () =>{
    setLogin(!login)
  }
  const menuSign = () =>{
    setSignIn(!signIn)
  }

  const userClick = () =>{
    setMenuUser(!menuUser)
  }
  
  const closePlayButton = () =>{
    const buttonMovie = document.querySelectorAll('.buttonMovie')
    buttonMovie.forEach((value)=>{
      value.classList.remove('flex')
      value.classList.add('hidden')
    })
    setMobileShowDetail(false)
  }

  const submitSearch = async (e) =>{
    e.preventDefault()
    try{
      if(searchMovie != ''){
        const movieSearch = await SearchMovie(searchMovie)
        if(movieSearch.data.results.length != 0){
          setListSearchMovie(movieSearch.data.results)
          setShowSearchMovie(true)
          setErrorHandle(true)
        }else{
          setMessageError('Movie Not Found')
        }
      }
      }
    catch (err){
      if (err.response) {
        setMessageError(err.response.data.status_message)
        setErrorHandle(false)
      } else if (err.request) {
        setMessageError(err.message)
      } else {
        console.log('Error', err.message);
      }
      setMessageError(err.message);
    }
    setSearchMovie('')
    setShowSearchMovie(true)
  }

  const User = () => {
    return (
        <div className='text-white flex items-center gap-2 text-lg cursor-pointer relative' onClick={userClick}>
          {menuUser && <div className='absolute rounded w-full top-12 text-lg backdrop-blur-sm bg-white/[.18] drop-shadow-lg'>
            <div className='flex items-center gap-3 rounded-t py-2 px-3 border-b border-slate-100/[.20] hover:bg-slate-500/[.80] transition-all' onClick={() =>{
              setUserSetting(true)
            }}>
              <CiSettings className='text-2xl'/>
              <h1>Setting</h1>
            </div>
            <div className='flex items-center gap-3 py-3 px-3 rounded-b hover:bg-slate-500/[.80] transition-all' onClick={() => {
              setUser(false) 
              localStorage.removeItem("login");
              } }>
              <CiLogout className='text-2xl' />
              <h1>logout</h1>
            </div>
          </div>}
          
          {data.gambar ? 
            <img src={data.gambar} alt="" width={24} height={24} className='rounded-full'/>
          :
          <FaUserCircle className='text-2xl'/>
          }
          <h1>Hello, {data.userName}</h1>
        </div>
    )
  }

  const MobileMovieDetail = () =>{
    return(
      <div className='w-full max-h-96 bg-[#161e2e] fixed inset-x-0 bottom-0 z-10 md:hidden text-white overflow-scroll rounded-t-lg'>
        <div className='relative'>
          <AiOutlineCloseCircle className='absolute z-10 top-1 right-1 text-slate-50 text-3xl cursor-pointer' onClick={closePlayButton} />
        </div>
        <div className='p-3 flex gap-3 '>
          <div className='w-[45%] h-fit'>
            <img src={`${import.meta.env.VITE_IMGURL}/${movieDetail.poster_path}`} alt="" className='rounded-lg max-w-full'/>
          </div>
          <div className='w-full'>
            <h1 className='w-[80%] text-md font-semibold tracking-wider'>{movieDetail.original_title}</h1>
            <div className='flex items-center gap-2'>
              <div className='flex items-center text-amber-400 text-sm'>
                  <AiFillStar />
                  <h1 className='ml-1'>{String(movieDetail.vote_average).substring(0,3)}</h1>
              </div>
              <div className='flex items-center text-sm'>
                  <BiCalendar />
                  <h1 className="ml-1">{String(movieDetail.release_date).substring(0,4)}</h1>
              </div>
              <div className='flex items-center text-sm'>
                  <BiTimeFive />
                  <h1 className="ml-1">{parseInt(Math.floor(movieDetail.runtime / 60))}h {parseInt(Math.floor(movieDetail.runtime % 60))}m</h1>
              </div>
            </div>
            <p className='mt-2 h-36 text-slate-200 opacity-90 font-Source overflow-ellipsis overflow-hidden'>{String(movieDetail.overview).split('.')[0]}</p>
          </div>
        </div>
            <div className=''>
              <BsFillPlayCircleFill className='mx-auto text-white text-5xl bg-black rounded-full'/>
              <p className='text-center mt-2'>Play</p>
            </div>
      </div>
    )
  }

  return (
    <div>
      <div className={navScrol}>
        <nav id='home'>
          <div className='w-full flex justify-between items-center lg:max-w-fit'>
            <div className='flex gap-4'>
              <div className='text-white text-3xl mt-1 md:mt-2 lg:hidden' onClick={updateMenu}>
                <GiHamburgerMenu />
              </div>
              <LinkScroll to='hero' smooth={true} offset={0} duration={500} className="cursor-pointer text-3xl md:text-4xl lg:text-4xl text-[#E50914] font-semibold font-Popins" onClick={() => setShowSearchMovie(false)}>Mov<span className="text-white font-normal">i.man</span></LinkScroll>
            </div>
            <form className='flex items-center justify-end w-[30%] md:w-[25%] lg:hidden' onSubmit={submitSearch}>
                <input type="text" className='bg-transparent border-b text-white w-full focus:outline-none px-2' value={searchMovie} onChange={(event) => setSearchMovie(event.target.value)}/>
                <button className='text-xl text-white md:text-2xl' ><BsSearch /></button>
              </form>
          </div>
          <div className='relative'>
            <div className={classMenu}>
                <div className='flex gap-4  py-3 -ml-2 pl-2 border-b border-slate-100/[.10] lg:hidden'>
                <div className='text-white text-3xl mt-1 md:mt-2 lg:hidden' onClick={updateMenu}>
                  <AiOutlineClose />
                </div>
                <LinkScroll to='hero' smooth={true} offset={0} duration={500} className="cursor-pointer text-3xl -ml-3 md:ml-0 md:text-4xl lg:text-4xl text-[#E50914] font-semibold font-Popins" onClick={() => setShowSearchMovie(false)}>Mov<span className="text-white font-normal">i.man</span></LinkScroll> 
                </div>
              <ul className="flex flex-col gap-5 text-slate-400 lg:justify-evenly lg:w-[80%] lg:flex-row lg:items-center lg:text-lg font-Source">
                <li className='text-xl'>
                  <LinkScroll to='Tranding' smooth={true} offset={-100} duration={500} className="cursor-pointer hover:text-white transition-all duration-300">Tranding</LinkScroll>
                </li>
                <li className='text-xl'>
                  <LinkScroll to='All_Movie' smooth={true} offset={-100} duration={500} className="cursor-pointer hover:text-white transition-all duration-300">All Movie</LinkScroll>
                </li>
              </ul>
              <div className="flex gap-10 lg:gap-5 lg:items-center">
                <form action="" className='hidden lg:flex items-center justify-end w-[32%]' onSubmit={submitSearch}>
                  <input type="text" className='bg-transparent border-b text-white w-full focus:outline-none px-2' value={searchMovie} onChange={(event) => setSearchMovie(event.target.value)}/>
                  <button className='text-xl text-white'><BsSearch /></button>
                </form>
                {userLogin ? <User />  :
                <>
                <button className="btn bg-[#E50914]" onClick={menuLogin}>Login</button>
                <button className="btn bg-[#E50914]" onClick={menuSign} >Sign in</button>
                </>
                }
              </div>
            </div>
          </div>
        </nav>
      </div>

      {login && <Login modalLogin={setLogin} showSingIn={setSignIn} userLogin={setUser}/>}
      {signIn && <Sign modalSign={setSignIn} showLogin={setLogin} />}
      {userSetting && <SettingUser closeSetting={setUserSetting} dataUser={data}/>}
      
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
      {mobileShowDetail && <MobileMovieDetail />}
    </div>
  )
}

export default App