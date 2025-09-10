import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const DropdownRole = ({ changeRole, value }) => {

    return (
        <div className='w-25 font-thai bg-black border border-gray-200 rounded-lg'>
            <div className='relative'>
                <select
                    className='font-semibold text-sm text-white w-full p-2 appearance-none outline-none'
                    name="role"
                    onChange={changeRole}
                    value={value}
                >
                    <option className='text-black'>user</option>
                    <option className='text-black'>admin</option>
                </select>
                <IoIosArrowDown className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white' />
            </div>
        </div>
    )
}

export default DropdownRole