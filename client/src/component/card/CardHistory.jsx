import React from 'react'
import Book from '../../assets/book.jpg'
import { CiPen } from "react-icons/ci";
import { numberFormat } from '../../Utils/numerral';
import { dateFormat } from '../../Utils/dateformat';


const CardHistory = ({ cartTotal, time, status, product }) => {
    // console.log(product)

    const getStatusColor = (status) => {
        switch (status) {
            case 'สั่งซื้อสำเร็จ':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-500'
                }
            case 'กำลังจัดส่ง':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-500'
                }
            case 'จัดส่งเรียบร้อยแล้ว':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-500'
                }
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-500'
                }
        }
    }

    const colors = getStatusColor(status)
    return (
        //card
        <div className='shadow rounded-md mt-5'>
            {/* header */}
            <div className='flex justify-between  items-center bg-gray-50 p-5 rounded-t-md font-thai tracking-wide'>
                <div>
                    <p className='text-sm text-gray-300'>วันที่สั่งซื้อ</p>
                    <p className='font-semibold text-base'>{dateFormat(time)}</p>
                </div>
                <div>
                    <button className={`font-semibold text-sm py-1 px-3 rounded-full ${colors.bg} ${colors.text}`}>
                        {status}</button>
                </div>
            </div>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr className='capitalize font-thai text-gray-500 text-sm tracking-wide'>
                        <th className='text-left pl-5 font-medium pb-3 '>สินค้า</th>
                        <th className='font-medium pb-3'>ราคา</th>
                        <th className='font-medium pb-3'>จำนวน</th>
                        <th className='text-left pr-5 font-medium pb-3'>ราคารวม</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 font-work'>
                    {
                        product.map((item, index) =>
                            <tr className='text-gray-500 text-sm' key={index}>
                                <td className='p-5 flex items-start gap-5'>
                                    {
                                        item.product.images && item.product.images.length > 0
                                            ? <div className='h-15 w-10'>
                                                <img src={item.product.images[0].url} className='h-full object-contain' />
                                            </div>
                                            : <div className='h-20 w-15 flex justify-center items-center rounded-lg bg-gray-200'>
                                                <p className='font-work text-center text-xs'>No Image</p>
                                            </div>
                                    }
                                    <div>
                                        <p className='line-clamp-1 font-semibold'>{item.product.title}</p>
                                        <div className='flex gap-1 items-center'>
                                            <p className='font-thai tracking-wide'>ผู้เขียน {item.product.writer}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center'>฿{item.price}</td>
                                <td className='text-center'>{item.count}</td>
                                <td className='text-left'>฿{numberFormat(item.price * item.count)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {/* total */}
            <div className='pb-5 px-5 flex justify-end font-work'>
                <div className='text-end text-md'>
                    <p className='font-semibold text-gray-500 font-thai tracking-wide'>รวมคำสั่งซื้อ</p>
                    <p className='font-bold text-yellow font-thai'>฿{numberFormat(cartTotal)}</p>
                </div>
            </div>
        </div>
    )
}

export default CardHistory