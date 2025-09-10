import React, { useEffect } from 'react'
import SearchBox from '../component/form/SearchBox'
import CardProduct from '../component/card/CardProduct'
import useEcomStore from '../store/ecom-store'
import Searchbar from '../component/shop/Searchbar'
import CartBar from '../component/shop/CartBar'


const Shop = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='flex px-4 mt-2'>
            <div className='w-1/6 h-screen p-4'>
                <Searchbar />
            </div>
            <div className='w-1/1 p-4 h-screen overflow-auto'>
                <p className='mb-5 text-lg font-work font-semibold'>Product</p>
                <div className='md:grid grid-cols-3 gap-7'>
                    {
                        products.map((item, index) =>
                            <CardProduct
                                key={index}
                                item={item}
                                className="card-animate"
                            />
                        )
                    }

                </div>
            </div>
            <div className='w-1/3 h-screen p-4 scrollbar-hide'>
                <CartBar />
            </div>
        </div >
    )
}

export default Shop