import React from 'react'
import SearchBox from '../form/SearchBox'
import { PiBellSimpleRingingFill } from "react-icons/pi";
import Profile from '../../assets/profile.svg'

const HeaderAdmin = () => {
    return (
        <header className='h-16 flex justify-between items-center px-6'>
            <SearchBox
                className='w-64'
                placeholder='Search Product, Category, Order...'
            />
            <div className='flex gap-5 items-center'>
                <div className='hover:bg-[#FFBB20] rounded-full transition-all duration-200 p-2'>
                    <PiBellSimpleRingingFill size={25} className='fill-[#d1d5dc] hover:fill-white' />
                </div>
                <div className='flex gap-5 items-center'>
                    <div>
                        <img src={Profile} alt='profile' className='rounded-full size-9'></img>
                    </div>
                    <div className='font-work'>
                        <p className='text-sm font-semibold capitalize'>fullstop store</p>
                        <p className='text-xs text-gray-300'>Admin</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderAdmin