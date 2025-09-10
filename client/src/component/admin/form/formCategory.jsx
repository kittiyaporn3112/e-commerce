import React, { useState, useEffect } from 'react'
import { createCategory, deleteCategory } from '../../../api/Category'
import { FaCirclePlus } from "react-icons/fa6";
import useEcomStore from '../../../store/ecom-store'
import { useToast } from '../../toast/toastService';
import { FaFilter } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
import CardCategory from '../category/CardCategory';
import ToastWarning from '../../toast/ToastWarning';
import ToastSuccess from '../../toast/ToastSuccess';

const formCategory = () => {
    const toast = useToast()
    const [name, setName] = useState('')
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.open(<ToastWarning message='กรุณากรอกชื่อหมวดหมู่' />)
        }
        try {
            const res = await createCategory(token, { name })
            toast.open(<ToastSuccess message='สร้างหมวดหมู่สินค้าสำเร็จ' />)
            getCategory(token)
            setName('')
        } catch (err) {
            console.log(err)
            const errMsg = err.response?.data?.message
            toast.open(<ToastSuccess message={errMsg} />)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteCategory(token, id)
            toast.open(
                <ToastSuccess message={res.data} />
            )
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center rounded-full px-2 outline-1 -outline-offset-1 outline-[#FFBB20] font-work w-[380px]">
                        <div className="shrink-0 select-none">
                            <FaCirclePlus color='#FFBB20' size={25} />
                        </div>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name category..." className="block w-64 grow py-1.5 pr-3 pl-2 text-base text-gray-900 placeholder:text-[#d1d5dc] focus:outline-none sm:text-sm/6" />
                        <button type='submit' className="shrink-0 text-xs bg-amber-400/20 py-1 px-2 font-medium  rounded-full">
                            Add category
                        </button>
                    </div>
                </form>
                <div className='flex gap-5'>
                    <div className='flex gap-2 items-center text-gray-700 font-medium'><FaFilter size={17} /> Filter</div>
                    <div className='flex gap-2 items-center text-gray-700 font-medium'><TbArrowsSort size={20} /> Sort</div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-5 gap-5'>
                {
                    categories.map((item, index) => {
                        return (
                            <CardCategory name={item.name} index={index} key={index} onDelete={handleDelete} id={item.id} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default formCategory