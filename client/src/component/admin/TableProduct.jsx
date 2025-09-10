import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { useToast } from '../toast/toastService'
import ToastSuccess from '../toast/ToastSuccess'
import ModalDelete from '../form/ModalDelete'

const TableProduct = ({ data }) => {
    const token = useEcomStore((state) => state.token)
    const toast = useToast()
    const getProduct = useEcomStore((state) => state.getProduct)
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const openModal = (id) => {
        setSelectedId(id)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setSelectedId(null)
    }
    const handleDelete = async (id) => {
        try {
            const res = await deleteProduct(token, id)
            toast.open(<ToastSuccess message={res.data} />)
            getProduct()
            closeModal()
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <div className="flex flex-col mt-10">
                {
                    data.map((item, index) => {
                        return (
                            <table className='rounded-md bg-white shadow-sm mb-5' key={item.id}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="pt-5 text-left text-sm font-thai font-semibold"></th>
                                        <th scope="col" className="pt-5 text-left text-sm font-thai font-semibold w-lg"></th>
                                        <th scope="col" className="pt-5 text-center text-sm font-thai font-semibold"> ราคา </th>
                                        <th scope="col" className="pt-5 text-center text-sm font-thai font-semibold"> จำนวนที่ขายได้ </th>
                                        <th scope="col" className="pt-5 text-center text-sm font-thai font-semibold"> จำนวนสินค้า </th>
                                        <th scope="col" className="pt-5 text-center text-sm font-thai font-semibold"> จัดการ </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-5 text-sm font-base text-left"> {index + 1}</td>
                                        <td className="py-5 flex gap-3">
                                            {
                                                item.images?.length > 0
                                                    // item.images[0].url คือเลือกรูปแรกมาแสดง
                                                    ? <div className='flex justify-center items-center w-15 h-15'>
                                                        <img className='h-full object-contain' src={item.images[0].url} />
                                                    </div>
                                                    : <div className='flex justify-center'>
                                                        <p className='rounded-md flex justify-center items-center bg-gray-400 text-xs font-work font-base h-15 w-20'>No Image</p>
                                                    </div>
                                            }
                                            <div>
                                                <p className='text-base font-thai'>{item.title}</p>
                                                <p className='font-light text-sm font-thai text-gray-300'>{item.category.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-base font-thai text-center">฿{item.price}</td>
                                        <td className="p-5 whitespace-nowrap text-base font-thai text-center"> {item.sold}</td>
                                        <td className="p-5 whitespace-nowrap text-base font-thai text-center"> {item.quantity}</td>
                                        <td className="p-5 whitespace-nowrap text-base font-thai font-semibold">
                                            <div className='flex gap-3 justify-center items-center border border-gray-200 rounded-sm p-1'>
                                                <Link to={`/admin/product/` + item.id}>
                                                    <button className='text-yellow'>แก้ไข</button>
                                                </Link>
                                                <span className='text-gray-200'>|</span>
                                                <button className='text-red-400' onClick={() => openModal(item.id)}>ลบ</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    })
                }
                <ModalDelete open={open} close={closeModal} onDelete={handleDelete} id={selectedId} />
            </div>
        </div>
    )
}

export default TableProduct

//  <button onClick={() => handleDelete(item.id)}>delete</button>