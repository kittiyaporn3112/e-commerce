import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { useParams } from 'react-router-dom'
import ProductOrder from '../../component/admin/ProductOrder'
import SummaryOrder from '../../component/admin/SummaryOrder'
import CustomerOrder from '../../component/admin/CustomerOrder'
import { readOrder } from '../../api/admin'

const DetailOrder = () => {
    const { id } = useParams()
    const token = useEcomStore((s) => s.token)
    const [product, setProduct] = useState([])
    const [customer, setCustomer] = useState({})
    const [payment, setPayment] = useState({})

    useEffect(() => {
        fetchOrder(token, id)
    }, [])

    const fetchOrder = async (token, id) => {
        try {
            const res = await readOrder(token, id)
            setProduct(res.data.products)
            setCustomer(res.data.orderedBy)
            setPayment(res.data.amount)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex gap-5 p-5'>
            <div className='flex flex-col gap-5'>
                <ProductOrder product={product} />
                <CustomerOrder customer={customer} />
            </div>
            <div>
                <SummaryOrder payment={payment} />
            </div>
        </div>
    )
}

export default DetailOrder