import React from 'react'
import FormInput from '../../form/FormInput'
import Button from '../../form/Button'
import UploadFile from '../../form/UploadFile';
import DropdownCat from '../DropdownCat';
import { FaXmark } from "react-icons/fa6";

const FormProduct = ({ open, close, formfunc, form, onChange, setForm, error }) => {
    if (!open) return null;
    return (
        <div className='mx-auto py-20 fixed flex justify-center items-center top-o left-0 right-0 bottom-0 w-full h-full bg-black/20'>
            <div className='w-full max-w-3xl rounded-md bg-white px-8 py-12 md:px-[30px] md:py-[25px] relative'>
                <div className='flex justify-between mb-5'>
                    <h1 className='font-thai font-bold text-xl'>เพิ่มสินค้า</h1>
                    <FaXmark className='size-5 text-[#d1d5dc]' onClick={close} />
                </div>
                <form onSubmit={formfunc} className='grid grid-cols-2 gap-x-3'>
                    <FormInput
                        name='title'
                        type='text'
                        placeholder='name for propduct...'
                        className='max-w-sm'
                        value={form.title}
                        func={onChange}
                        error={error.title}
                    />
                    <FormInput
                        name='writer'
                        type='text'
                        placeholder='name writer...'
                        className='max-w-sm'
                        value={form.writer}
                        func={onChange}
                        error={error.writer}
                    />
                    <FormInput
                        name='description'
                        type='text'
                        placeholder='enter description...'
                        className='max-w-sm'
                        value={form.description}
                        func={onChange}
                    />
                    <FormInput
                        name='price'
                        type='number'
                        placeholder='enter price...'
                        className='max-w-sm'
                        value={form.price}
                        func={onChange}
                        error={error.price}
                    />
                    <FormInput
                        name='quantity'
                        type='number'
                        placeholder='enter quantity...'
                        className='max-w-sm'
                        value={form.quantity}
                        func={onChange}
                        error={error.quantity}
                    />
                    <DropdownCat
                        onChange={onChange}
                        value={form.categoryId}
                    />
                    <div className='col-span-2 mb-10'>
                        <UploadFile
                            form={form}
                            setForm={setForm}
                        />
                    </div>
                    <div className='col-span-2 flex justify-center gap-5'>
                        <Button
                            text='ยกเลิก'
                            className='w-46 bg-white border border-gray-200 hover:bg-gray-50'
                            onClick={close}
                        />
                        <Button
                            text='เพิ่มสินค้า'
                            className='w-46 bg-black text-white'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormProduct