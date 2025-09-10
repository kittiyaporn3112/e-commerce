import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/navbar/Navbar'

const Layoute = () => {
    return (
        <div>
            <Navbar />
            <main className='h-full mx-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layoute