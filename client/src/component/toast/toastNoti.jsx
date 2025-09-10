import React from 'react'

const toastNoti = ({ icon, title, message, text }) => {
    return (
        <div className={`flex gap-3 bg-white text-${text} rounded-md shadow-md p-2 w-80 font-work`}>
            <div>
                {icon}
            </div>
            <div>
                <h3 className='font-bold text-lg'>{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default toastNoti