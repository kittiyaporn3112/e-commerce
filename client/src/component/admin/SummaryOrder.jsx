import React from 'react'
import { numberFormat } from '../../Utils/numerral'

const SummaryOrder = ({ payment }) => {
    return (
        <div className='p-5 bg-white rounded-md shadow'>
            <h1 className='text-xl text-gray-700 font-thai font-bold'>
                ข้อมูลการชำระเงิน
            </h1>
            <hr className='h-px bg-gray-200 border-0 my-3' />
            <div className='flex justify-between font-thai'>
                <p>ค่าจัดส่ง</p>
                <p>0</p>
            </div>
            <div className='flex justify-between font-thai'>
                <p>ส่วนลด</p>
                <p>0</p>
            </div>
            <hr className='h-px bg-gray-200 border-0 my-3' />
            <div className='flex justify-between font-thai font-bold text-lg'>
                <p>ยอดการสั่งซื้อทั้งหมด</p>
                <p className='text-yellow'>฿{numberFormat(payment)}</p>
            </div>
        </div>
    )
}

export default SummaryOrder