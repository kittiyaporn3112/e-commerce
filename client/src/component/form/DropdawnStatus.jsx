import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const DropdawnStatus = ({ changeStatus, value }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'สั่งซื้อสำเร็จ':
                return {
                    bg: 'bg-[#FFEEC7]',
                    text: 'text-yellow'
                }
            case 'กำลังจัดส่ง':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-[#2081FF]'
                }
            case 'จัดส่งเรียบร้อยแล้ว':
                return {
                    bg: 'bg-green-100',
                    text: 'text-[#21C76C]'
                }
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-500'
                }
        }
    }

    // console.log(value)
    const colors = getStatusColor(value)

    return (
        <div className={`w-40 font-thai ${colors.bg} rounded-md pl-1`}>
            <div className='relative'>
                <select
                    className={`font-bold ${colors.text} text-sm  w-full p-2 appearance-none focus:outline-none`}
                    name="orderStatus"
                    onChange={changeStatus}
                    value={value}
                >
                    <option className='text-black'>สั่งซื้อสำเร็จ</option>
                    <option className='text-black'>กำลังจัดส่ง</option>
                    <option className='text-black'>จัดส่งเรียบร้อยแล้ว</option>
                </select>
                <IoIosArrowDown className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${colors.text}`} />
            </div>
        </div>
    )
}

export default DropdawnStatus

// border-1 border-[#e7e7e7]