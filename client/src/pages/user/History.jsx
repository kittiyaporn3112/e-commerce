import React, { useEffect, useState } from 'react'
import CardHistory from '../../component/card/CardHistory'
import { getOrder } from '../../api/user';
import useEcomStore from '../../store/ecom-store';

const History = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrder(token)
    }, [])

    const fetchOrder = (token) => {
        getOrder(token)
            .then((res) => {
                setOrders(res.data.orders)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <h1 className='font-bold text-2xl font-thai mt-10'>ประวัติการสั่งซื้อ</h1>
            {
                orders?.map((item, index) =>
                    <CardHistory
                        key={index}
                        cartTotal={item.amount}
                        time={item.createdAt
                        }
                        status={item.orderStatus}
                        product={item.products}
                    />
                )
            }
        </div>
    )
}

export default History