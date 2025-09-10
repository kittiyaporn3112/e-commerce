import React from 'react'

const Button = ({ text, className, onClick, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} font-semibold rounded-md py-2 px-5 font-thai`}>
            {text}
        </button>
    )
}

export default Button