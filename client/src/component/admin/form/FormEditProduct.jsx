import React, { useEffect, useState } from 'react'
import useEcomStore from '../../../store/ecom-store'
import FormInput from '../../form/FormInput'
import Button from '../../form/Button'
import DropdownCat from '../DropdownCat'
import { readProduct, updateProduct } from '../../../api/product';
import { useToast } from '../../toast/toastService';
import UploadFile from '../../form/UploadFile';
import { useParams, useNavigate } from 'react-router-dom'
import ToastSuccess from '../../toast/ToastSuccess'

const initialState = {
    title: 'boylove',
    description: 'boylovebook',
    price: 250,
    quantity: 10,
    categoryId: 2,
    images: []
}

const FormEditProduct = () => {
    const [form, setForm] = useState(initialState)
    const toast = useToast()
    const token = useEcomStore((state) => state.token)
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetchProduct(token, id)
    }, [])

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const fetchProduct = async (token, id) => {
        try {
            const res = await readProduct(token, id)
            setForm(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.open(
                <ToastSuccess
                    message={`แก้ไขข้อมูลสินค้าสำเร็จ`}
                />
            )
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <h1 className='text-lg font-work font-bold mb-5'>Edite Product</h1>

            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-5'>
                <FormInput
                    name='title'
                    type='text'
                    placeholder='name for propduct...'
                    className='max-w-sm'
                    value={form.title}
                    func={handleOnChange}
                />
                <FormInput
                    name='writer'
                    type='text'
                    placeholder='name writer...'
                    className='max-w-sm'
                    value={form.writer}
                    func={handleOnChange}
                />
                <FormInput
                    name='description'
                    type='text'
                    placeholder='enter description...'
                    className='max-w-sm'
                    value={form.description}
                    func={handleOnChange}
                />
                <FormInput
                    name='price'
                    type='number'
                    placeholder='enter price...'
                    className='max-w-sm'
                    value={form.price}
                    func={handleOnChange}
                />
                <FormInput
                    name='quantity'
                    type='number'
                    placeholder='enter quantity...'
                    className='max-w-sm'
                    value={form.quantity}
                    func={handleOnChange}
                />
                <DropdownCat
                    onChange={handleOnChange}
                    value={form.categoryId}
                />

                <UploadFile
                    form={form}
                    setForm={setForm}
                />
                <div className='col-span-2 flex justify-center mt-5'>
                    <Button text='edit' className='w-30' />
                </div>
            </form>

        </>
    )
}

export default FormEditProduct