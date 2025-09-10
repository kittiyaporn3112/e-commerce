import React, { use } from 'react'
import useEcomStore from '../../store/ecom-store';
import Button from '../form/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user'
import { useToast } from '../toast/toastService'
import ToastSuccess from '../toast/ToastSuccess'
import ToastError from '../toast/ToastError'
import { numberFormat } from '../../Utils/numerral';

const TableCheckout = () => {
    const cart = useEcomStore((state) => state.carts);
    const token = useEcomStore((state) => state.token)
    const user = useEcomStore((state) => state.user)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const toast = useToast()
    const navigate = useNavigate()

    const handleSaveCart = async (e) => {
        //carts ส่งเป็นออบเจ็คไปให้หลังบ้านเพราะว่าเราออกแบบไว้เป็นออบเจ็ค
        await createUserCart(token, { cart })
            .then((res) => {
                navigate('/checkout')
                toast.open(<ToastSuccess message='เพิ่มสินค้าลงตระกร้าสำเร็จ' />)
            })
            .catch((err) => {
                toast.open(<ToastError message={err.response.data.message} />)
            })
    }
    return (
        <>
            <div className='flex flex-col'>
                <div className=' overflow-x-auto'>
                    <div className='min-w-full inline-block align-middle'>
                        <div className='overflow-hidden rounded-lg'>
                            <table className='min-w-full md:w-3xl rounded-xl'>
                                <thead>
                                    <tr>
                                        <th scope='col' className='p-5 text-left text-md leading-6 w-5/6 font-semibold text-gray-900 capitalize rounded-t-xl font-work'> product </th>
                                        <th scope='col' className='p-5 text-md leading-6 font-semibold text-gray-900 capitalize text-center font-work'> quantity </th>
                                        <th scope='col' className='p-5 text-left text-md leading-6 font-semibold text-gray-900 capitalize rounded-t-xl font-work'> price </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {
                                        cart.map((item, index) =>
                                            <tr className='whitespace-nowrap text-sm leading-6 font-medium' key={index}>
                                                <td className='p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900'>
                                                    <div className='flex gap-5'>
                                                        {
                                                            item.images && item.images.length > 0
                                                                ? <div className='h-20 w-15'>
                                                                    <img src={item.images[0].url} className='h-full object-contain' />
                                                                </div>
                                                                : <div className='h-20 w-15 flex justify-center items-center rounded-lg bg-gray-200'>
                                                                    <p className='font-work text-center text-xs'>No Image</p>
                                                                </div>
                                                        }
                                                        <div>
                                                            <p className='text-md font-work'>{item.title}</p>
                                                            <p className='font-light font-thai text-gray-300'>{item.category.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='p-5 whitespace-nowrap leading-6 font-medium font-work text-center '>
                                                    X {item.count}
                                                </td>
                                                <td className='p-5 whitespace-nowrap leading-6 font-medium font-work'>
                                                    {numberFormat(item.price * item.count)} ฿
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr className='p-5 whitespace-nowrap text-md leading-6'>
                                        <td className='p-5 whitespace-nowrap leading-6 font-medium '>
                                            <Link to='/shop'>
                                                <button className='border border-black px-3 py-1 font-work'>continue shoping</button>
                                            </Link>
                                        </td>
                                        <td></td>
                                        <td className='p-5 whitespace-nowrap leading-6 font-work font-semibold'>
                                            <div className='flex gap-5 text-left'>
                                                <span>Total</span>
                                                <span>{numberFormat(getTotalPrice())} ฿</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='p-5 whitespace-nowrap text-md leading-6'>
                                        <td></td>
                                        <td></td>
                                        <td className='pl-5 whitespace-nowrap leading-6 font-work font-semibold'>
                                            {
                                                !user
                                                    ?
                                                    <Link to='/login'>
                                                        <Button
                                                            text='Login'
                                                            className='w-full bg-black text-white mt-5 md:w-30'
                                                        />
                                                    </Link>
                                                    :
                                                    <Button
                                                        text='Checkout'
                                                        className='w-full bg-black text-white mt-5 md:w-30 mb-5'
                                                        onClick={handleSaveCart}
                                                        disabled={cart.length < 1}
                                                    />
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableCheckout