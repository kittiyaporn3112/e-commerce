import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

const ModalDelete = ({ close, open, onDelete, id }) => {
    if (!open) return null;
    return (
        <div className='mx-auto py-20 fixed flex justify-center items-center top-o left-0 right-0 bottom-0 w-full h-full bg-black/20'>
            {/* card */}
            <div className='w-full max-w-md rounded-md bg-white px-8 py-12 md:px-[30px] md:py-[25px] relative shadow'>
                <div className='flex justify-end'>
                    <FaXmark className='size-5 text-[#d1d5dc]' onClick={close} />
                </div>
                <div className='flex flex-col items-center'>
                    <button className='w-13 h-13 bg-red-100 rounded-full flex justify-center items-center mb-5'><FaTrash className='size-7 text-red-500' /></button>
                    <h1 className='font-thai text-xl font-bold mb-3'>ลบสินค้า</h1>
                    <p className='font-thai mb-5'>คุณต้องการลบสินค้าชิ้นนี้ ?</p>
                </div>
                <div className='flex gap-10 justify-center'>
                    <button className='bg-gray-100 rounded-full px-10 py-2 text-lg font-thai font-bold' onClick={close}>ยกเลิก</button>
                    <button className='bg-red-500 rounded-full px-10 py-2 text-lg text-white font-thai font-bold' onClick={() => onDelete(id)}>ยืนยัน</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete