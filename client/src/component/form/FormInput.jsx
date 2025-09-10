import React from 'react'

const FormInput = ({ name, type, placeholder, className, func, value, error }) => {
    return (
        <div className='flex flex-col mb-3'>
            <label htmlFor={name} className='block mb-2 text-md font-medium text-gray-900 capitalize'>{name}</label>
            <input
                onChange={func}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                className={` ${className} bg-white block border-1 border-[#e7e7e7] text-sm rounded-lg  p-2.5 relative`}
            >
            </input >
            {error && <span className='text-red-500 font-thai mt-2 text-sm'>{error}</span>}
        </div>
    )
}

export default FormInput