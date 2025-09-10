import React, { useEffect, useState } from 'react'
import CardProductOrder from '../card/CardProductOrder'
import TextArea from '../form/TextArea'
import OrderSummary from './OrderSummary'
import useEcomStore from '../../store/ecom-store'
import { getUserCart, saveAddress } from '../../api/user'
import { useToast } from '../toast/toastService'
import ToastWarning from '../toast/ToastWarning'
import ToastSuccess from '../toast/ToastSuccess'
import { useNavigate } from 'react-router-dom'

const Addresscard = () => {
    const token = useEcomStore((state) => state.token)
    const toast = useToast()
    const navigate = useNavigate()
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        fechUserCart(token)
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!address.trim()) {
            return toast.open(<ToastWarning message='กรุณากรอกที่อยู่' />)
        }
        saveAddress(token, address)
            .then((res) => {
                toast.open(<ToastSuccess message='บันทึกที่อยู่สำเร็จ' />)
                setAddressSaved(true)
            })
            .catch((err) => console.log(err))
    }

    const handleGoToPayment = () => {
        if (!addressSaved) {
            return toast.open(<ToastWarning message='กรุณากรอกที่อยู่' />)
        }
        navigate('/user/payment')
    }

    const fechUserCart = (token) => {
        getUserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='max-w-full flex flex-col md:flex-row gap-5'>
            <div className='w-full p-5 bg-white shadow rounded-md'>
                <p className='font-bold text-md mb-3'>Address</p>
                <TextArea
                    onChange={(e) => setAddress(e.target.value)}
                    onSubmit={handleSubmit}
                />
                <CardProductOrder data={products} />
            </div>
            <div className='md:w-lg'>
                <OrderSummary
                    total={cartTotal}
                    onClick={handleGoToPayment}
                />
            </div>
        </div >
    )
}

export default Addresscard

//flex gap-5