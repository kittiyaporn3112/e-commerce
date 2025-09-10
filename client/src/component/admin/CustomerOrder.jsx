import React from 'react'

const CustomerOrder = ({ customer }) => {
    return (
        <div className='p-5 bg-white rounded-md shadow font-thai'>
            <h1 className='text-xl text-gray-700 font-thai font-bold mb-5'>
                ข้อมูลลูกค้า
            </h1>
            <div className='flex gap-3 items-center'>
                <img src={customer.picture} className='w-10 rounded-full' />
                <p className='font-semibold capitalize text-gray-700'>{customer.username}</p>
            </div>
            <hr className='h-px bg-gray-200 border-0 my-5' />
            <div className=' flex flex-col gap-y-3'>
                <div>
                    <span className='text-xs text-gray-500'>อีเมลล์</span>
                    <p className='font-medium'>{customer.email}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-500'>ที่อยู่</span>
                    <p className='font-medium'>{customer.address}</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerOrder