import React from 'react'
import { numberFormat } from '../../Utils/numerral'

const CardProductOrder = ({ data }) => {

    return (
        <table className='w-full'>
            <thead>
                <tr>
                    <th className='py-5 text-left text-sm leading-6 font-medium font-thai text-gray-400'>
                        ชื่อสินค้า
                    </th>
                    <th className='py-5 text-center text-sm leading-6 font-medium font-thai text-gray-400'>
                        ราคาต่อเล่ม
                    </th>
                    <th className='py-5 text-center text-sm leading-6 font-medium font-thai text-gray-400'>
                        จำนวน
                    </th>
                    <th className='py-5 text-left text-sm leading-6 font-medium font-thai text-gray-400'>
                        ราคารวม
                    </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {
                    //? คือถ้าไม่มีข้อมูลไม่ต้องทำ
                    data?.map((item, index) =>
                        <tr className='text-sm' key={index}>
                            <td className='p-5 leading-6 font-semibold font-work'>
                                <div className='flex gap-3 items-center '>
                                    {
                                        item.product.images && item.product.images.length > 0
                                            ? <div className='h-15 w-15'>
                                                <img src={item.product.images[0].url} className='h-full object-contain' />
                                            </div>
                                            : <div className='h-15 w-15 flex justify-center items-center rounded-lg bg-gray-200'>
                                                <p className='font-work text-center text-xs'>No Image</p>
                                            </div>
                                    }
                                    <p className='line-clamp-1'>{item.product.title}</p>
                                </div>
                            </td>
                            <td className='p-5 leading-6  font-work text-center'>
                                ฿ {item.price}
                            </td>
                            <td className='p-5 leading-6  font-work text-center'>
                                x {item.count}
                            </td>
                            <td className='p-5 leading-6  font-work text-left'>
                                ฿ {numberFormat(item.count * item.product.price)}
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default CardProductOrder


{/* <tr className='text-sm' key={index}>
                            <td className='p-5 leading-6 font-semibold font-work'>
                                <div className='flex gap-3 items-center '>

                                    <div className='h-15 w-15'>
                                        <img src={Book} className='h-full object-contain' />
                                    </div>
                                    <p>Paris-34 days in Europe</p>
                                </div>
                            </td>
                            <td className='p-5 leading-6  font-work'>
                                ฿ 375
                            </td>
                            <td className='p-5 leading-6  font-work'>
                                x 3
                            </td>
                            <td className='p-5 leading-6  font-work'>
                                ฿ 1,125
                            </td>
                        </tr> */}