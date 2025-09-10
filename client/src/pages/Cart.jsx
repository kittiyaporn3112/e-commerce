import React from 'react'
import TableCheckout from '../component/cart/TableCheckout'
import TextArea from '../component/form/TextArea'

const Cart = () => {
    return (
        <div className='flex flex-col items-center px-4 mt-2'>
            <p className='text-3xl font-work font-bold my-10'>Shopin cart items</p>
            <TableCheckout />
        </div>

    )
}

export default Cart