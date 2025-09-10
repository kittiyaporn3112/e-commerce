import React, { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { TbTrashFilled } from "react-icons/tb";
import { numberFormat } from '../../Utils/numerral';

const CardCart = ({ item, actionMinus, actionPlus, actionRemove }) => {

    return (
        <>
            <div className='max-w-md p-1'>
                <div className='flex gap-5'>
                    {
                        item.images && item.images.length > 0
                            ? <div className='h-20 w-20'>
                                <img src={item.images[0].url} className='h-full object-contain' />
                            </div>
                            : <div className='h-20 w-20 flex justify-center items-center rounded-lg bg-gray-200'>
                                <p className='font-work text-center text-xs'>No Image</p>
                            </div>
                    }
                    <div className='flex flex-col justify-between w-full'>
                        <div>
                            <div className='flex items-center'>
                                <p className='text-sm font-medium font-work line-clamp-1 flex-1'>{item.title}</p>
                                <TbTrashFilled size={20} fill='red' onClick={actionRemove} className='flex-shrink-0 cursor-pointer' />
                            </div>
                            <p className='text-xs font-medium font-work text-gray-300'>X {item.count}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='max-w-md flex justify-center gap-3 font-work'>
                                <button onClick={actionMinus} type='button' className='w-5 h-5  bg-white shadow-xs border border-gray-300 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-gray-100'>
                                    <FaMinus className='size-2' />
                                </button>
                                <p className='text-sm font-medium font-work'>{item.count}</p>
                                <button onClick={actionPlus} type='button' className='w-5 h-5  bg-white shadow-xs border border-gray-300 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-gray-100'>
                                    <FaPlus className='size-2' />
                                </button>
                            </div>
                            <p className='text-sm font-medium font-work'>{numberFormat(item.price * item.count)} ฿</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='h-px bg-gray-200 border-0 my-5'></hr>
        </>
    )
}

export default CardCart