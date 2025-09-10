import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../component/navbar/SidebarAdmin'
import HeaderAdmin from '../component/navbar/HeaderAdmin'

const LayoutAdmin = () => (
    <div className='flex h-screen'>
        <SidebarAdmin />

        <div className='flex-1 flex flex-col'>
            <HeaderAdmin />
            <main className='flex-1 p-6 bg-[#FAFAFA] overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    </div>
)

export default LayoutAdmin