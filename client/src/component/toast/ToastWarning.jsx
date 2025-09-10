import React from 'react'
import { FaExclamation } from "react-icons/fa6";

const ToastWarning = ({ message }) => {
    return (
        <div className={` bg-yellow-50 text-black rounded-full shadow-sm py-2 px-3 w-80  flex items-center gap-3`}>
            <button className='bg-yellow-400 rounded-full w-9 h-9 flex justify-center items-center'><FaExclamation className='text-white' /></button>
            <div className=''>
                <p className='capitalize font-thai font-semibold '>คำเตือน</p>
                <p className='capitalize font-thai text-sm'>{message}</p>
            </div>
        </div>
    )
}

export default ToastWarning