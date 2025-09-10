import React, { useEffect, useState } from 'react'
import CardRecom from '../card/CardRecom'
import { listProductBy } from '../../api/product'

const BestSeller = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProductRecom()
    }, [])

    const fetchProductRecom = () => {
        listProductBy('sold', 'asc', 4)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='px-5 py-10'>
            <h1 className='text-center font-thai font-semibold text-xl tracking-wide'>สินค้าขายดีประจำร้าน</h1>
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

export default BestSeller