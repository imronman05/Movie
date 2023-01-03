import {React, useState} from 'react'
import { BsSearch } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import {Link as LinkScroll} from 'react-scroll/modules'
import UserLogin from './../Modal/UserLogin'
import {SearchMovie} from './../../api'

const Navigation = (props) => {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const [classMenu, setClassMenu] = useState('menuMobile -left-full');
    const [searchMovie,setSearchMovie] = useState('')
    const userLogin = JSON.parse(localStorage.getItem('login'))
    const [menuUser, setMenuUser] = useState(false)

    const updateMenu = () =>{
        if(!hamburgerMenu){
            setClassMenu('menuMobile -left-0')
        }else{
            setClassMenu('menuMobile -left-full')
            setMenuUser(false)
        }
    setHamburgerMenu(!hamburgerMenu)
    }

    const submitSearch = async (e) =>{
        e.preventDefault()
        if(searchMovie != ''){
            props.loading(true)
            try{
                const movieSearch = await SearchMovie(searchMovie)
                if(movieSearch.data.results.length != 0 && searchMovie != 'asd'){
                    props.movieSearch(movieSearch.data.results)
                    props.showSearchMovie(true)
                    props.error(true)
                }else{
                    props.loading(false)
                    props.error(false)
                    props.errorMesangge('Movie Not Found')
                }
            }catch (err){
                props.loading(false)
                if (err.response) {
                    props.errorMesangge(err.response.data.status_message)
                    props.error(false)
                }else if(err.request) {
                    props.errorMesangge(err.message)
                }else{
                console.log('Error', err.message);
                }
                props.errorMesangge(err.message);
            }finally{
                props.loading(false)
            }
            setSearchMovie('')
            props.showSearchMovie(true)
        }
    }

    return(
    <nav id='home'>
        <div className='w-full flex justify-between items-center lg:max-w-fit'>
            <div className='flex gap-4'>
                <div className='text-white text-3xl mt-1 md:mt-2 lg:hidden' onClick={updateMenu}>
                <GiHamburgerMenu />
                </div>
                <LinkScroll to='hero' smooth={true} offset={0} duration={500} className="cursor-pointer text-3xl md:text-4xl lg:text-4xl text-[#E50914] font-semibold font-Popins" onClick={() => props.showSearchMovie(false)}>Mov<span className="text-white font-normal">i.man</span></LinkScroll>
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
                    <LinkScroll to='hero' smooth={true} offset={0} duration={500} className="cursor-pointer text-3xl -ml-3 md:ml-0 md:text-4xl lg:text-4xl text-[#E50914] font-semibold font-Popins" onClick={() => props.showSearchMovie(false)}>Mov<span className="text-white font-normal">i.man</span></LinkScroll> 
                </div>
                <ul className="flex flex-col gap-5 text-slate-400 lg:justify-evenly lg:w-[80%] lg:flex-row lg:items-center lg:text-lg font-Source">
                    <li className='text-xl'>
                        <LinkScroll to='Tranding' smooth={true} offset={-100} duration={500} className="cursor-pointer hover:text-white transition-all duration-300">Trending</LinkScroll>
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
                {userLogin ? <UserLogin userSetting={props.userSetting} dataUser={props.dataUser} logout={props.userIsLogin} menuUser={menuUser} setMenuUser={setMenuUser}/>  :
                <>
                    <button className="btn bg-[#E50914]" onClick={() => props.login(true)}>Login</button>
                    <button className="btn bg-[#E50914]" onClick={() => props.sign(true)} >Sign in</button>
                </>
                }
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navigation
