import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import Lazada from '../../assets/lazada.svg'

const Footer = () => {
    return (
        <footer className='bg-black text-white p-5'>
            <div className='mt-5 grid grid-cols-3 font-thai'>
                <div >
                    <p className='font-bold mb-3'>FULLSTOP PUBLISHING LIMITED PARTNERSHIP</p>
                    <p className='font-thai text-sm mb-3'>118/15 อาคารยังเพลส ซอยสุขุมวิท 23 เขตวัฒนา กรุงเทพฯ 10110
                    </p>
                    <p className='flex gap-3 items-center mb-1 text-sm'><FaPhoneAlt /> 0951921243</p>
                    <p className='flex gap-3 items-center text-sm'><IoMail size={15} /> fullstopnut@gmail.com</p>
                </div>
                <div className='justify-self-center'>
                    <p className='font-semibold mb-3'>Menu</p>
                    <ul className='text-sm'>
                        <li className='hover:underline underline-offset-4 decoration-yellow'>Home</li>
                        <li className='hover:underline underline-offset-4 decoration-yellow'>shop</li>
                        <li className='hover:underline underline-offset-4 decoration-yellow'>cart</li>
                        <li className='hover:underline underline-offset-4 decoration-yellow'>about</li>
                    </ul>
                </div>
                <div className='justify-self-end'>
                    <p className='font-semibold mb-3'>Social Media Links</p>
                    <div className='flex gap-5'>
                        <button className='rounded-full border border-white p-2 transition delay-100 hover:bg-white hover:text-black'><FaFacebookF /></button>
                        <button className='rounded-full border border-white p-2 transition delay-100 hover:bg-white hover:text-black'><SiShopee /></button>
                        <button className='rounded-full border border-white p-2 transition delay-100 hover:bg-white hover:text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-4 ' viewBox="0 0 387 329">
                                <path d="M5.68605 226.348L188.686 326.856C191.684 328.503 195.316 328.503 198.314 326.856L381.314 226.348C384.512 224.592 386.5 221.232 386.5 217.583V48.9851C386.5 45.2999 384.473 41.9133 381.225 40.1719L308.681 1.27763C305.483 -0.436975 301.639 -0.306285 298.559 1.61252C280.548 12.8337 218.185 50.5744 193.5 51C168.753 51.4267 103.59 12.8944 85.0103 1.58362C81.8874 -0.317453 78.0159 -0.389376 74.8256 1.39635L5.61564 40.1365C2.45663 41.9048 0.5 45.2423 0.5 48.8625V217.583C0.5 221.232 2.48764 224.592 5.68605 226.348Z" fill='currentColor' />
                            </svg>
                        </button>
                    </div>
                </div>
                <div></div>
            </div>
            <hr className='my-5 h-px bg-gray-200 border-0' />
            <div className='flex justify-between items-center font-work text-xs font-semibold'>
                <p>2025 © FULLSTOP PUBLISHING.All Rigths Reserved</p>
                <div className='flex gap-5'>
                    <p className='hover:underline underline-offset-4 decoration-yellow'>Terms of use</p>
                    <p className='hover:underline underline-offset-4 decoration-yellow'>Private policy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer