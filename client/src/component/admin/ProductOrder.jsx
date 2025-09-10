import React from 'react'
import { numberFormat } from '../../Utils/numerral'
import { useParams } from 'react-router-dom'

const ProductOrder = ({ product }) => {
    const { id } = useParams()
    return (
        <div className='p-5 bg-white rounded-md shadow'>
            <h1 className='text-xl text-gray-700 font-thai font-bold mb-5'>
                Order
                <span className='text-yellow'>#{id}</span>
            </h1>
            <table>
                <tbody className='divide-y divide-gray-200'>
                    {
                        product.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td className='py-5 font-thai'>
                                        <div className='flex gap-3'>
                                            {
                                                item.product.images && item.product.images.length > 0
                                                    ? <div className='h-15 w-15'>
                                                        <img src={item.product.images[0].url} className='h-full object-contain' />
                                                    </div>
                                                    : <div className='h-15 w-15 flex justify-center items-center rounded-lg bg-gray-200'>
                                                        <p className='font-thai text-center text-xs'>No Image</p>
                                                    </div>
                                            }
                                            <p className='font-medium text-sm line-clamp-1'>{item.product.title}</p>
                                        </div>
                                    </td>
                                    <td className='font-medium text-sm w-30 text-center'>{item.product.price}</td>
                                    <td className='font-medium text-sm w-30 text-center'>{item.count}</td>
                                    <td className='font-medium text-sm w-20 text-end'>฿{numberFormat(item.count * item.product.price)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductOrder