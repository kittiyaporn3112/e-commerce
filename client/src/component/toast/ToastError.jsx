import React from 'react'
import { FaXmark } from "react-icons/fa6";

const ToastError = ({ message }) => {
    return (
        <div className={` bg-red-50 text-black rounded-full shadow-sm py-2 px-3 w-80  flex items-center gap-3`}>
            <button className='bg-red-400 rounded-full w-9 h-9 flex justify-center items-center'><FaXmark className='text-white' /></button>
            <div className=''>
                <p className='capitalize font-thai font-semibold'>เกิดข้อผิดพลาด</p>
                <p className='capitalize font-thai text-sm'>{message}</p>
            </div>
        </div>
    )
}

export default ToastError