import React from 'react'
import { FaInstagram,FaGithub,FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
return (
    <footer className='text-white flex flex-col justify-center items-center border-t border-slate-100/[.15] py-5 gap-3'>
        <div className='flex gap-4 text-lg md:text-2xl'>
            <a href="https://www.instagram.com/imronman05/?hl=id" target='_blank' className='hover:text-slate-500 transition-all duration-300'><FaInstagram /></a>
            <a href="https://github.com/imronman05" target="_blank" className='hover:text-slate-500 transition-all duration-300'><FaGithub /></a>
            <a href="https://mail.google.com/mail/u/0/?fs=1&to=imronman1998@gmail.com&tf=cm" target='_blank' className='hover:text-slate-500 transition-all duration-300'><SiGmail /></a>
            <a href="https://www.linkedin.com/in/imron-rosadi-495204222/" target='_blank' className='hover:text-slate-500 transition-all duration-300'><FaLinkedin /></a>
        </div>
        <p className='text-md md:text-lg'>2022 &copy; ImronMan</p>
    </footer>
)
}

export default Footer
