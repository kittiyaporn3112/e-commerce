import React from 'react'
import { MdShoppingBag } from "react-icons/md";
import { FaBoxOpen, FaShippingFast } from "react-icons/fa";

const OverviewOrder = ({ count, order }) => {
    const shipping = count.find(item => item.orderStatus === 'กำลังจัดส่ง')?._count.id || 0
    const delivered = count.find(item => item.orderStatus === 'จัดส่งเรียบร้อยแล้ว')?._count.id || 0

    return (
        <div className='flex justify-between font-thai mb-5'>
            <div className='flex gap-5 border border-[#d1d5dc] w-60 py-5 px-5 rounded-md'>
                <button className='bg-yellow/25 w-13 h-13 flex justify-center items-center rounded-full'>
                    <MdShoppingBag className='text-yellow size-7' />
                </button>
                <div>
                    <h1 className='font-bold text-xl'>{order}</h1>
                    <p className='text-[#d1d5dc]'>คำสั่งซื้อ</p>
                </div>
            </div>
            <div className='flex gap-5 border border-[#d1d5dc] w-60 py-5 px-5 rounded-md'>
                <button className='bg-[#2081FF]/25 w-13 h-13 flex justify-center items-center rounded-full'>
                    <FaBoxOpen className='text-[#2081FF] size-7' />
                </button>
                <div>
                    <h1 className='font-bold text-xl'>{shipping}</h1>
                    <p className='text-[#d1d5dc]'>กำลังจัดส่ง</p>
                </div>
            </div>
            <div className='flex gap-5 border border-[#d1d5dc] w-60 py-5 px-5 rounded-md'>
                <button className='bg-[#21C76C]/25 w-13 h-13 flex justify-center items-center rounded-full'>
                    <FaShippingFast className='text-[#21C76C] size-7' />
                </button>
                <div>
                    <h1 className='font-bold text-xl'>{delivered}</h1>
                    <p className='text-[#d1d5dc]'>จัดส่งเรียบร้อยแล้ว</p>
                </div>
            </div>
        </div>
    )
}

export default OverviewOrder