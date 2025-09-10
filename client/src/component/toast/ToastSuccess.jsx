import React from 'react'
import { FaCheck } from "react-icons/fa6";

const ToastSuccess = ({ message }) => {
    return (
        <div className={` bg-green-50 text-black rounded-full shadow-sm py-2 px-3 w-80  flex items-center gap-3`}>
            <button className='bg-green-400 rounded-full w-9 h-9 flex justify-center items-center'><FaCheck className='text-white' /></button>
            <div className=''>
                <p className='capitalize font-thai font-semibold '>สำเร็จ</p>
                <p className='capitalize font-thai text-sm'>{message}</p>
            </div>
        </div>
    )
}

export default ToastSuccess