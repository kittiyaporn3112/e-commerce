import React, { useEffect, useState } from 'react'
import { RiLoader4Fill } from "react-icons/ri";
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setRedirect(true)
        }, 3000) //แสดงโหลดดิ้งสามวิ

        return () => clearTimeout(timer)

    }, [])

    if (redirect) {
        return <Navigate to='/' />
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            {loading &&
                <div className='flex flex-col items-center'>
                    <RiLoader4Fill color='#FFBB20' size={40} className='animate-spin mb-3' />
                    <h1 className='font-work font-semibold text-lg'>Forbiden</h1>
                    <p>access to this resource on the server is denied!</p>
                </div>}
        </div>
    )
}

export default LoadingToRedirect