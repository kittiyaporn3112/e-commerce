import React from 'react'
import DropdawnStatus from '../form/DropdawnStatus';
import useEcomStore from '../../store/ecom-store';
import { numberFormat } from '../../Utils/numerral';
import { dateFormat } from '../../Utils/dateformat';
import { Link } from 'react-router-dom';

const TableOrder = ({ data, changeStatus }) => {
    const token = useEcomStore((s) => s.token)

    return (
        <table className='w-full'>
            <thead className='border-b border-[#d1d5dc]'>
                <tr>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> หมายเลขคำสั่งซื้อ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> วันที่สั่งซื้อ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> ชื่อผู้สั่งซื้อ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-center font-thai pb-2'> ยอดการสั่งซื้อ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-center font-thai pb-2'> สถานะ </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-[#d1d5dc]'>
                {
                    data.map((item, index) => {
                        return (
                            <tr className='font-thai text-sm' key={index}>
                                <td className='font-semibold'>
                                    <Link to={`/admin/order/` + item.id}>
                                        #{item.id}
                                    </Link></td>
                                <td>{dateFormat(item.createdAt)}</td>
                                <td>{item.orderedBy.username}</td>
                                <td className='text-center'>฿{numberFormat(item.cartTotal)}</td>
                                <td className='flex justify-center py-3'>
                                    <DropdawnStatus
                                        changeStatus={(e) => changeStatus(token, item.id, e.target.value)}
                                        value={item.orderStatus}
                                    />
                                </td>
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
        </table>
    )
}

export default TableOrder