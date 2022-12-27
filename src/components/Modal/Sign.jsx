import { useRef } from 'react';
import { React, useState } from 'react';
import { AiOutlineCloseCircle,AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { GrFormViewHide } from 'react-icons/gr';



const Sign = (props) => {
  const [data,setData] = useState({
    id: +1,
    gambar: '',
    userName: '',
    email: '',
    password: '',
  })

  const [alertForm, setAlertForm] = useState(false)
  const [alertSucces, setAlertSucces] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)
  const [password,setPassword] = useState('password')
  const btnRef = useRef()
  const [btnLoading,setButtonLoading] = useState(false)

  const close = () =>{
    props.modalSign(false)
  }

  const showPassword = () =>{
    setPassword('text')
    setPasswordShow(true)
  }

  const hidePassword = () =>{
      setPassword('password')
      setPasswordShow(false)
  }

  const onChange = (event) =>{
    const name = event.target.getAttribute('name')
    const value = event.target.value;

    const newData = {...data}
    newData[name] = value

    setData(newData)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    if(data.email != '' && data.userName != '' && data.password != ''){
      if(typeof(Storage) !== undefined){
        btnRef.current.classList.remove('bg-[#E50914]')
        btnRef.current.classList.add('bg-red-900')
        setButtonLoading(true)

        setTimeout(() =>{
          localStorage.setItem('user', JSON.stringify(data))
          const inputValue = document.querySelectorAll('.sign')
          inputValue.forEach((value) =>{
            value.value = ''
          })
          setButtonLoading(false)
          btnRef.current.classList.remove('bg-red-900')
          btnRef.current.classList.add('bg-[#E50914]')
          setAlertSucces(true)
        },5000)
      }else{
        setAlertForm(true)
      }
    }
  }

  const closeAlert = () =>{
    setAlertForm(false)
  }

  const closeAlertSucces = () =>{
    setAlertSucces(false)
  }

  const showLogin = (e) =>{
    e.preventDefault()
    props.showLogin(true)
    props.modalSign(false)
  }

  return (
    <div className='backdrop-blur-sm bg-black/30 fixed h-screen w-screen inset-0 flex items-center justify-center p-0 z-30'>
      <div className='relative p-0 w-[78%] md:w-[50%] lg:w-[29%]'>
        <AiOutlineCloseCircle className='absolute top-0 right-0 text-slate-800 text-3xl cursor-pointer' onClick={close} />
        <form action="" className='bg-white px-4 py-5 flex flex-col gap-6 rounded-md' onSubmit={handleSubmit}>
          <h1 className='text-center text-3xl font-semibold text-slate-800'>Sign in</h1>
          {alertForm && 
            <div className='bg-red-300 text-black py-1 px-2 text-lg flex items-center justify-between'>
              <h1>Browser anda belum mendukung!</h1>
              <AiOutlineCloseCircle className='text-2xl cursor-pointer' onClick={closeAlert}/>
            </div> 
          }
          {alertSucces && 
            <div className='bg-green-300 text-black py-1 px-2 text-lg flex items-center justify-between'>
              <h1><span className='font-semibold'>Selamat</span> Akun berhasil dibuat</h1>
              <AiOutlineCloseCircle className='text-2xl cursor-pointer' onClick={closeAlertSucces}/>
            </div> 
          }
          <div className='text-xl relative'>
            <input type="name" placeholder=' ' name='userName' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' onChange={onChange} required/>
            <label htmlFor='name' className='absolute -top-5 -left-2 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>Username</label>
          </div>
          <div className='text-xl relative'>
            <input type="email" placeholder=' ' name='email' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' onChange={onChange} required/>
            <label htmlFor='email' className='absolute -top-5 -left-1 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>Email</label>
          </div>
          <div className='text-xl relative'>
            <input type={password} placeholder=' ' name='password' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' onChange={onChange} required/>
            <label htmlFor={password} className='absolute -top-5 -left-2 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>password</label>
            {passwordShow ? <BiShowAlt className='absolute inset-y-0 right-2 cursor-pointer' onClick={hidePassword}/> : <GrFormViewHide className='absolute inset-y-0 right-2 cursor-pointer' onClick={showPassword}/>}
          </div>
          <button className='btn flex items-center justify-center gap-2 bg-[#E50914]' ref={btnRef} disabled={btnLoading ? true : false}>
            {btnLoading ? 
            <>
            <AiOutlineLoading3Quarters className='animate-spin text-center'/>
              Processing...
            </>
          :
              'Sign'
          }
          </button>
          <p className='text-lg text-center'>Sudah punya akun? <button className='font-semibold underline' onClick={showLogin}>Login disini!</button></p>
        </form>
      </div>
    </div>
  )
}

export default Sign