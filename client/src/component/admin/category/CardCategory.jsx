import React from 'react'
import { imgCategory } from '../../../Utils/Link'
import Dropdown from '../../form/Dropdown'

const CardCategory = ({ name, index, onDelete, id }) => {
    return (
        <div className='bg-white max-w-sm p-4 shadow rounded-md  '>
            <div className='flex justify-end'>
                <Dropdown onDelete={onDelete} id={id} />
            </div>
            <div className='flex flex-col justify-center items-center gap-5 text-center font-thai font-semibold'>
                {imgCategory[index] && (
                    <div>
                        {imgCategory[index].img}
                    </div>
                )}
                {name}
            </div>
        </div>
    )
}

export default CardCategory