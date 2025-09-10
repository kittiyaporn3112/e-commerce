import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const CardRecom = ({ data }) => {
    return (
        <div className='max-w-sm w-sm rounded-lg group transition deley-150 duration-300 hover:bg-gray-100/50 hover:-translate-y-1'>
            <div className='h-40 pt-3 flex items-center justify-center'>
                {
                    data.images && data.images.length > 0
                        ? <img src={data.images[0].url} className='h-full object-contain' />
                        : 'f'
                }
            </div>
            <div className='p-5 flex flex-col gap-3 items-center'>
                <div className='flex flex-col items-center'>
                    <p className='text-xs text-yellow font-thai'>{data.category.name}</p>
                    <p className='font-thai font-medium text-gray-700 line-clamp-1'>{data.title}</p>
                </div>
                <p className='font-thai font-light text-gray-700 text-sm'>{data.writer}</p>
                <p className='font-thai font-light text-sm'>THB {data.price}</p>

                <button className='w-40 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full py-1 px-3 bg-yellow text-white font-thai font-light'>
                    ดูเพิ่มเติม
                    <FaArrowRightLong />
                </button>
            </div>
        </div>
    )
}

export default CardRecom