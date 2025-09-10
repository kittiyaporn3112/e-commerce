import React from 'react'

const CardUser = ({ form, setForm, enabled, onUpdate, onChange }) => {
    return (
        <form onSubmit={onUpdate}>
            <div className='grid grid-cols-2 gap-5 font-thai mt-5'>
                <div>
                    <span className='text-xs text-gray-400'>ชื่อผู้ใช้</span>
                    <input
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        className='w-full py-1 border-b-1 border-gray-400 outline-none' />
                </div>
                <div>
                    <span className='text-xs text-gray-400'>อีเมลล์</span>
                    <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        className='w-full py-1 border-b-1 border-gray-400 outline-none' disabled />
                </div>
                <div className='col-span-2 mt-3'>
                    <span className='text-xs text-gray-400'>ที่อยู่</span>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        className='py-1 border-b-1 border-gray-400 outline-none w-full' />
                </div>
            </div>
            <div className='flex justify-center gap-5'>
                <button type='submit' className='border border-gray-400 mt-5 px-5 py-1 w-40 text-black font-thai font-semibold rounded-full hover:bg-gray-100'>บันทึกข้อมูล</button>
                <button onClick={enabled} className='bg-red-500 mt-5 px-5 py-1 w-40 text-white font-thai font-semibold rounded-full hover:bg-red-600'>ปิดใช้งานบัญชี</button>
            </div>
        </form>
    )
}

export default CardUser