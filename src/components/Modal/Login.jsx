
import { React, useState,useRef } from 'react';
import { AiOutlineCloseCircle,AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { GrFormViewHide } from 'react-icons/gr';


const Login = (props) => {
  const [login,setLogin] =useState({
    name: '',
    password: ''
  })
  const [usernameInfo, setUsernameInfo] = useState('text-sm text-pink-600 font-semibold invisible')
  const [passwordInfo, setpasswordInfo] = useState('text-sm text-pink-600 font-semibold invisible')
  const [akunNull,setAkunNull] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)
  const [password,setPassword] = useState('password')
  const btnRef = useRef()
  const [btnLoading,setButtonLoading] = useState(false)

  const showPassword = () =>{
    setPassword('text')
    setPasswordShow(true)
  }

  const hidePassword = () =>{
      setPassword('password')
      setPasswordShow(false)
  }

  const close = () =>{
    props.modalLogin(false)
  }
  const showSingIn = (e) =>{
    e.preventDefault()
    props.showSingIn(true)
    props.modalLogin(false)
  }

  const handleChange = (event) =>{
    const atributeName = event.target.getAttribute('name')
    const value = event.target.value;

    const dataLogin = {...login}
    dataLogin[atributeName] = value

    setLogin(dataLogin)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    const data = JSON.parse(localStorage.getItem('user'))
    if(data == null){
      setAkunNull(true)
    }else if(data.userName != login.name && data.password != login.password){
      setUsernameInfo('text-sm text-pink-600 font-semibold')
      setpasswordInfo('text-sm text-pink-600 font-semibold')
    }else if(data.userName != login.name && data.password == login.password){
      setUsernameInfo('text-sm text-pink-600 font-semibold')
      setpasswordInfo('text-sm text-pink-600 font-semibold invisible')
    }else if(data.userName == login.name && data.password != login.password){
      setUsernameInfo('text-sm text-pink-600 font-semibold invisible')
      setpasswordInfo('text-sm text-pink-600 font-semibold')
    }else{
      setUsernameInfo('text-sm text-pink-600 font-semibold invisible')
      setpasswordInfo('text-sm text-pink-600 font-semibold invisible')
      btnRef.current.classList.remove('bg-[#E50914]')
      btnRef.current.classList.add('bg-red-900')
      setButtonLoading(true)
      
      setTimeout(() =>{
        const inputValue = document.querySelectorAll('.login')
        inputValue.forEach((value) =>{
          value.value = ''
        })
        setButtonLoading(false)
        btnRef.current.classList.remove('bg-red-900')
        btnRef.current.classList.add('bg-[#E50914]')
        props.userLogin(true)
        props.modalLogin(false)
        localStorage.setItem('login', true)
      },5000)
    }
  }

  return (
    <div className='backdrop-blur-sm bg-black/30 fixed h-screen w-screen inset-0 flex items-center justify-center p-0 z-30'>
      <div className='relative p-0'>
        <AiOutlineCloseCircle className='absolute top-0 right-0 text-slate-800 text-3xl cursor-pointer' onClick={close} />
        <form action="" className='bg-white px-4 py-5 flex flex-col gap-5 rounded-md ' onSubmit={handleSubmit}>
          <h1 className='text-center text-3xl font-semibold text-slate-800'>Login</h1>
          {akunNull &&
            <div className='bg-green-300 text-black py-1 px-2 text-lg flex items-center justify-between'>
              <h1>Akun Tidak Ditemukan</h1>
              <AiOutlineCloseCircle className='text-2xl cursor-pointer' onClick={() => setAkunNull(false)}/>
            </div> 
            }
          <div className='text-xl relative'>
            <input type="name" placeholder=' ' name='name' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer login' required onChange={handleChange}/>
            <label htmlFor='email' className='absolute -top-5 -left-2 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0'>Username</label>
            <p className={usernameInfo}>Username salah!</p>
          </div>
          <div className='text-xl relative'>
            <input type={password} placeholder=' ' name='password' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer login' required onChange={handleChange}/>
            <label htmlFor={password} className='absolute -top-5 -left-2 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>Password</label>
            <p className={passwordInfo}>Password salah!</p>
            {passwordShow ? <BiShowAlt className='absolute inset-y-0 right-2 cursor-pointer' onClick={hidePassword}/> : <GrFormViewHide className='absolute inset-y-0 right-2 cursor-pointer' onClick={showPassword}/>}
          </div>
          <button className='btn flex items-center justify-center gap-2 bg-[#E50914]' ref={btnRef} disabled={btnLoading ? true : false}>
            {btnLoading ? 
            <>
            <AiOutlineLoading3Quarters className='animate-spin text-center'/>
              Processing...
            </>
          :
              'Login'
          }
          </button>
          <p className='text-lg text-center'>Belum punya akun? <button className='font-semibold underline' onClick={showSingIn}>Daftar disini!</button></p>
        </form>
      </div>
    </div>
  )
}

export default Login
