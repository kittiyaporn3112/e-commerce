import React, { useEffect, useState } from 'react'
import CardRecom from '../card/CardRecom'
import { listProductBy } from '../../api/product'

const Recommen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProductRecom()
    }, [])

    const fetchProductRecom = () => {
        listProductBy('createdAt', 'asc', 4)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='px-5 py-10'>
            <div className='flex justify-between'>
                <h1 className='text-center font-thai font-semibold text-xl tracking-wide'>สินค้าแนะนำ</h1>
                <p className='font-thai hover:underline'>ดูทั้งหมด</p>
            </div>
            <div className='mt-5 flex justify-center gap-3'>
                {
                    products.map((item, index) =>
                        <CardRecom data={item} key={index} />

                    )
                }
            </div>
        </div>
    )
}

export default Recommen

// bg-gradient-to-b from-yellow-50 to-white 