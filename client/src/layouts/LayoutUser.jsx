import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/navbar/Navbar'

const LayoutUser = () => {
    return (
        <div>
            <Navbar />
            <main className='h-full px-4 mt-2 mx-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutUser