import React from 'react'
import { Link } from 'react-router-dom'
import CardCart from '../card/CardCart'
import useEcomStore from '../../store/ecom-store'
import Button from '../form/Button'
import { numberFormat } from '../../Utils/numerral'

const CartBar = () => {
    const cart = useEcomStore((state) => state.carts);
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    return (
        <div>
            <p className='mb-5 text-lg font-work font-semibold'>Cart</p>
            {
                cart.map((item, index) =>
                    < CardCart
                        key={index}
                        item={item}
                        actionMinus={() => actionUpdateQuantity(item.id, item.count - 1)}
                        actionPlus={() => actionUpdateQuantity(item.id, item.count + 1)}
                        actionRemove={() => actionRemoveProduct(item.id)}
                    />

                )
            }
            <div className='flex justify-between w-full text-sm font-medium font-work mb-5'>
                <p>summary</p>
                <p>{numberFormat(getTotalPrice())} ฿</p>
            </div>
            <Link to='/cart'>
                <Button
                    text='Payment'
                    className='w-full bg-black text-white'
                />
            </Link>
        </div>
    )
}

export default CartBar