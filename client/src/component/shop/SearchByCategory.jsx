import React from 'react'

const SearchByCategory = ({ categories, onClick }) => {
    return (
        <div className='flex flex-col gap-y-3'>
            <h1 className='mb-1 text-md font-work font-medium'>By Categories</h1>
            {
                categories.map((item, index) =>
                    <div className='flex gap-3 items-baseline' key={index}>
                        <input type='checkbox' onClick={onClick}
                            value={item.id}
                            className='accent-black'
                        />

                        <label className='font-thai text-md'>{item.name}</label>
                    </div>
                )
            }
        </div>
    )
}

export default SearchByCategory