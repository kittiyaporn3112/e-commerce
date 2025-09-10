import React from 'react'
import { FaCartArrowDown } from "react-icons/fa6";
import useEcomStore from '../../store/ecom-store';

const CardProduct = ({ item, className }) => {
    const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

    return (
        <div className={`${className} max-w-md p-3 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110`}>
            {
                item.images && item.images.length > 0
                    ?
                    <div className='h-40 flex justify-center items-center rounded-lg'>
                        <img src={item.images[0].url} className='h-full object-contain' />
                    </div>
                    :
                    <div className='h-40 flex justify-center items-center rounded-lg font-work bg-gray-200'>
                        No Image
                    </div>
            }
            <div className='mt-3 font-work'>
                <h1 className='font-semibold text-sm line-clamp-1'>{item.title}</h1>
                {
                    item.writer
                        ? <p className='font-thai font-light text-[#D2D5DF] text-xs tracking-wide line-clamp-1'>{item.writer}</p>
                        : ''
                }
                <div className='flex justify-between text-sm mt-5'>
                    <span className='font-semibold '>{item.price} ฿</span>
                    <span className='text-[#FFBB20] '>{item.sold} Sold</span>
                </div>
            </div>
            <div className='flex justify-end mt-3'>
                <button onClick={() => actionAddtoCart(item)}>
                    <FaCartArrowDown size={20} />
                </button>
            </div>
        </div>
    )
}

export default CardProduct