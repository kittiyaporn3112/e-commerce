import React from 'react'
import { numberFormat } from '../../Utils/numerral'

const OrderSummary = ({ total, onClick }) => {
    return (
        <div className='shadow rounded-md bg-white'>
            <div className='w-full'>
                <div className='font-thai tracking-wide p-3'>
                    <p className='font-bold text-md'>ยอดรวมคำสั่งซื้อ</p>
                    <hr className='h-px bg-gray-200 border-0 my-5' />
                    <div>
                        <div className='flex justify-between mb-5 text-sm font-medium'>
                            <p>
                                ส่วนลด
                            </p>
                            <p>฿0</p>
                        </div>
                        <div className='flex justify-between text-sm font-medium'>
                            <p>
                                ค่าจัดส่ง
                            </p>
                            <p>฿0</p>
                        </div>
                    </div>
                    <hr className='h-px bg-gray-200 border-0 my-5' />
                    <div>
                        <div className='flex justify-between font-semibold text-md'>
                            <p>ราคารวมสุทธิ</p>
                            <p>฿{numberFormat(total)}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className='w-full bg-yellow text-white font-thai tracking-wide font-bold py-2 px-5 rounded-b-md hover:bg-yellow-500'>
                    สั่งซื้อ
                </button>
            </div>
        </div>
    )
}

export default OrderSummary