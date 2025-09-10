import React from 'react'
import TableUser from '../../component/table/tableUser'

const Manage = () => {
    return (
        <div className='bg-white p-5 rounded-md shadow'>
            <h1 className='font-bold font-thai text-xl mb-5'>จัดการผู้ใช้</h1>
            <TableUser />
        </div>
    )
}

export default Manage