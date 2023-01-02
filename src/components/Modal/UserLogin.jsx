import {React, useState} from 'react'
import { CiSettings, CiLogout } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';

const UserLogin = (props) => {
    const [menuUser, setMenuUser] = useState(false)

    const onCLick = () =>{
        setMenuUser(!menuUser)
    }

    return (
        <div className='text-white flex items-center gap-2 text-lg cursor-pointer relative' onClick={onCLick}>
        {menuUser && 
        <div className='absolute rounded w-full top-12 text-lg backdrop-blur-sm bg-white/[.18] drop-shadow-lg'>
            <div className='flex items-center gap-3 rounded-t py-2 px-3 border-b border-slate-100/[.20] hover:bg-slate-500/[.80] transition-all' 
            onClick={() =>{
                props.userSetting(true)
            }}>
                <CiSettings className='text-2xl'/>
                <h1>Setting</h1>
            </div>
            <div className='flex items-center gap-3 py-3 px-3 rounded-b hover:bg-slate-500/[.80] transition-all' onClick={() => {
                props.logout(false)
                localStorage.removeItem("login");
                } }>
                <CiLogout className='text-2xl' />
                <h1>logout</h1>
            </div>
        </div>}
        
        {props.dataUser.gambar ? 
            <img src={props.dataUser.gambar} alt="" width={24} height={24} className='rounded-full'/>
        :
        <FaUserCircle className='text-2xl'/>
        }
        <h1>Hello, {props.dataUser.userName}</h1>
        </div>
    )
}

export default UserLogin