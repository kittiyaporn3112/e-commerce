import React, { useState } from 'react'
import { LuLogOut } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Profile from '../../assets/logo2.svg'


const ProfileDropdown = ({ logout, user }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='relative inline-block'>
            {
                user ?
                    <img src={user} className='rounded-full size-9' onClick={() => setOpen(!open)} />
                    : <div className='w-9 rounded-full bg-yellow flex justify-center items-center'>
                        <img src={Profile} className='w-20' />
                    </div>
            }

            {/* dropdown box */}
            <div className={`w-50 bg-white absolute right-0 top-15  font-thai shadow rounded-md ${open ? 'block' : 'hidden'}`}>
                <p className='w-full px-4 py-2.5 hover:bg-gray-50'>

                    <Link to={'/user/'} className='flex gap-3 items-center text-base font-medium text-gray-500 hover:text-gray-700'>
                        <IoSettingsSharp />
                        ตั้งค่าบัญชีผู้ใช้
                    </Link>
                </p>
                <hr className='h-px bg-gray-200 border-0' />
                <p className='w-full px-4 py-2.5 hover:bg-gray-50'>

                    <Link to={'/user/history'} className='flex gap-3 items-center text-base font-medium text-gray-500 hover:text-gray-700'>
                        <FaHistory />
                        ประวัติการสั่งซื้อ
                    </Link>
                </p>
                <hr className='h-px bg-gray-200 border-0' />
                <p className='w-full px-4 py-2.5 hover:bg-gray-50'>

                    <button onClick={logout} className='flex gap-3 items-center text-base font-medium text-gray-500 hover:text-gray-700'>
                        <LuLogOut />
                        ออกจากระบบ
                    </button>
                </p>
            </div>
        </div>
    )
}

export default ProfileDropdown