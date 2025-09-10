import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import useEcomStore from '../../store/ecom-store';

const DropdownCat = ({ onChange, value }) => {
    const categories = useEcomStore((state) => state.categories)
    return (
        <div className='max-w-sm'>
            <h3 className='block mb-2 text-md font-medium text-gray-900'>Category Id</h3>
            <div className='relative'>
                <select
                    className='border-1 border-[#e7e7e7] text-sm rounded-lg w-full p-2.5 appearance-none'
                    name="categoryId"
                    onChange={onChange}
                    required
                    value={value}
                >
                    <option value="" disabled>please select</option>
                    {
                        categories.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </select>
                <FaAngleDown className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2' />
            </div>
        </div>
    )
}

export default DropdownCat