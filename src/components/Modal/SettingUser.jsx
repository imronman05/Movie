import { useState,useRef } from 'react';
import { AiOutlineCloseCircle,AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { AiOutlineCamera } from 'react-icons/ai';
import { GrFormViewHide } from 'react-icons/gr';
import picDefault from './../../assets/picDefault.png'

const SettingUser = (props) => {
    const newData = {
        id: length+1,
        gambar: '',
        userName: '',
        email: '',
        password: ''
    }

    const [passwordShow, setPasswordShow] = useState(false)
    const [password,setPassword] = useState('password')
    const img = useRef()
    const editData = JSON.parse(localStorage.getItem('user'))
    const [pict,setPick] = useState(editData.gambar);
    const [valueUsername, setValueUsername] = useState(editData.userName)
    const [valueEmail, setValueEmail] = useState(editData.email)
    const [valuePassword, setValuePassword] = useState(editData.password)
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

    const imageChange = (event) =>{
        let pic = URL.createObjectURL(event.target.files[0])
        setPick(pic)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(valueUsername != '' && valueEmail != '' && valuePassword != ''){
            btnRef.current.classList.remove('bg-[#E50914]')
            btnRef.current.classList.add('bg-red-900')
            setButtonLoading(true)

            setTimeout(() =>{
                newData.gambar = pict
                newData.userName = valueUsername
                newData.email = valueEmail
                newData.password = valuePassword
                localStorage.setItem('user', JSON.stringify(newData))
                props.closeSetting(false)

                setButtonLoading(false)
                btnRef.current.classList.remove('bg-red-900')
                btnRef.current.classList.add('bg-[#E50914]')
            }, 5000)
        }else{
            console.log('gagal')
        }
    }

  return (
    <div className="backdrop-blur-sm bg-black/30 fixed h-screen w-screen inset-0 flex items-center justify-center p-0 z-30">
        <div className="relative w-[78%] md:w-[50%] lg:w-[40%]">
            <AiOutlineCloseCircle className='absolute top-0 right-0 text-slate-800 text-3xl cursor-pointer' onClick={() => props.closeSetting(false)}/>
            <form action="" className="bg-white px-4 py-5 flex flex-col gap-6 rounded-md" onSubmit={handleSubmit}>
            <div className='relative h-28 w-28 mx-auto'>
                <img src={pict ? pict : picDefault} alt="" className='w-full h-full rounded-full '/>
                <div className='absolute bottom-0 right-3 flex justify-center items-center z-10 bg-white p-1 rounded-full'>
                    <div className='bg-cyan-700 p-[2px] rounded-full cursor-pointer' onClick={() => img.current.click()}>
                        <AiOutlineCamera color={'white'} width='20px' height='20px' />
                    </div>
                </div>
                <input ref={img} type="file" id='gambar' name='gambar' hidden accept='image/*' onChange={imageChange} />
            </div>
            <div className='text-xl relative'>
                <input type="name" placeholder=' ' name='userName' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' defaultValue={valueUsername} onChange={(e) => setValueUsername(e.target.value)} id='name' required/>
                <label htmlFor='name' className='absolute -top-5 -left-2 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>Username</label>
            </div>
            <div className='text-xl relative'>
                <input type="email" placeholder=' ' name='email' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' defaultValue={valueEmail} onChange={(e) => setValueEmail(e.target.value)} required/>
                <label htmlFor='email' className='absolute -top-5 -left-1 transition-all scale-75 duration  peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-0 peer-placeholder-shown:-left-0 '>Email</label>
            </div>
            <div className='text-xl relative'>
                <input type={password} placeholder=' ' name='password' className='bg-transparent border-b border-slate-600 text-slate-800 w-full focus:outline-none peer sign' defaultValue={valuePassword} onChange={(e) => setValuePassword(e.target.value)} required/>
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
              'Simpan'
          }
          </button>
            </form>
        </div>
    </div>
)
}

export default SettingUser