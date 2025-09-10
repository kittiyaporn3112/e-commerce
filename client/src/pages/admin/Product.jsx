import React, { useEffect, useState } from 'react'
import FormProduct from '../../component/admin/form/FormProduct'
import useEcomStore from '../../store/ecom-store';
import ToastSuccess from '../../component/toast/ToastSuccess';
import { createProduct } from '../../api/product';
import { useToast } from '../../component/toast/toastService';
import TableProduct from '../../component/admin/TableProduct'


const initialState = {
    title: '',
    writer: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '',
    images: [],
}

const Product = () => {
    const toast = useToast()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const products = useEcomStore((state) => state.products)
    const getProduct = useEcomStore((state) => state.getProduct)
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validation = {}
        if (!form.title.trim()) {
            validation.title = 'จำเป็นต้องมีชื่อเรื่อง'
        } else if (form.title.length < 5) {
            validation.title = 'ชื่อหนังสือควรมีมากกว่า 5 ตัวอักษร'
        }

        if (!form.writer.trim()) {
            validation.writer = 'จำเป็นต้องมีชื่อผู้เขียน'
        } else if (form.writer.length < 2) {
            validation.writer = 'ชื่อผู้เขียนควรมีมากกว่า 2ตัวอักษร'
        }

        if (form.price <= 0) {
            validation.price = 'ราคาสินค้าต้องมากว่า 0'
        }

        if (form.quantity < 1) {
            validation.quantity = 'กรุณาใส่จำนวนสินค้า'
        }

        setError(validation)
        //ถ้า validation มีมากกว่า 0 ให้รีเทิร์นไม่ไม่ทำเพิ่มข้อมูลได้
        if (Object.keys(validation).length > 0) {
            return;
        }
        try {
            const res = await createProduct(token, form)
            toast.open(<ToastSuccess message={`เพิ่มสินค้าสำเร็จ`} />)
            setForm(initialState);
            getProduct()
            closeForm()
        } catch (err) {
            console.log(err)
        }
    }

    console.log(error)

    const openForm = () => {
        setOpen(true)
    }

    const closeForm = () => {
        setOpen(false)
        setError({})
    }
    return (
        <>
            <div className='mx-auto p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-lg mb-5'>Product</h1>
                    <button type='button' className='py-2.5 px-6 text-md rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200 text-white cursor-pointer font-semibold font-thai text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l' onClick={openForm}>เพิ่มสินค้า</button>
                </div>
                <FormProduct
                    form={form}
                    formfunc={handleSubmit}
                    onChange={handleOnChange}
                    setForm={setForm}
                    open={open}
                    close={closeForm}
                    error={error}
                />
                <TableProduct
                    data={products}
                />
            </div>

        </>
    )
}

export default Product