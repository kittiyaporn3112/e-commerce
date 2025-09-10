import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { OrderCount, updateStatus } from '../../api/admin'
import OverviewOrder from '../../component/order/OverviewOrder'
import TableOrder from '../../component/order/TableOrder'

const Order = () => {
    const token = useEcomStore((s) => s.token)
    const orders = useEcomStore((s) => s.orders)
    const getOrder = useEcomStore((s) => s.getOrders)
    const [countStatus, setCountStatus] = useState([])
    const [countOrder, setCountOrder] = useState([])

    useEffect(() => {
        getOrder(token)
        fetchCountOrder(token)
    }, [])


    const fetchCountOrder = async (token) => {
        try {
            const res = await OrderCount(token)

            setCountStatus(res.data.byStatus)
            setCountOrder(res.data.byDay)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeStatus = (token, orderId, orderStatus) => {
        updateStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                getOrder(token)
                fetchCountOrder(token)

            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='bg-white p-5 rounded-md shadow' >
            <OverviewOrder
                count={countStatus}
                order={countOrder}
            />
            <h1 className='font-bold text-lg mb-5'>Orders</h1>
            <TableOrder
                data={orders}
                changeStatus={handleChangeStatus}
            />
        </div >
    )
}

export default Order