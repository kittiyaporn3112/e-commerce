import React from 'react'

const TextArea = ({ onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className='w-full mb-4 border border-gray-200 rounded-lg focus-within:outline-2 focus-within:outline-yellow focus-within:border-none'>
                <div className='px-4 py-2  rounded-t-lg'>
                    <label htmlFor='address' className='sr-only'>Your address</label>
                    <textarea
                        className='w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none' placeholder='Write your address...'
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className='p-2 border-gray-200 flex justify-end'>
                    <button
                        type='submit' className='inline-flex items-center py-2.5 px-4 text-sm font-medium font-thai text-center text-white bg-yellow rounded-lg  hover:bg-yellow-500'>
                        บันทึกที่อยู่
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TextArea