import React, { useState } from 'react'
import Resize from 'react-image-file-resizer'
import { removeImage, uploadImages } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { FaXmark } from "react-icons/fa6";
import { RiLoader4Fill } from "react-icons/ri";

const UploadFile = ({ form, setForm, className }) => {
    const [isLoading, setLoading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnchange = (e) => {
        // setLoading(true)
        const files = e.target.files
        if (files) {
            setLoading(true)
            let allfiles = form.images //array ว่าง
            //ลูปเท่าจำนวน file ที่ใส่มา
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]) //เข้าถึงลำดับในอาร์เรย์
                //image resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data) => {
                        //endpoit backend
                        uploadImages(token, data)
                            .then((res) => {
                                allfiles.push(res.data)
                                //ใส่ allfiles เข้าไปใน setForm
                                setForm({
                                    ...form,
                                    images: allfiles
                                })
                                setLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                setLoading(false)
                            })
                    },
                    'base64'
                )
            }
        }

    }

    const handleDelete = (public_id) => {
        const images = form.images
        removeImage(token, public_id)
            .then((res) => {
                const filterImage = images.filter((item, index) => {
                    //รีเทิร์นออกไปเป็นรูปภาพที่ไม่เท่ากับ public_id ที่เราลบไป  
                    return item.public_id !== public_id
                })
                console.log('filterImage', filterImage)
                setForm({
                    ...form,
                    //คัดลอกข้อมูลเก่ามาแล้วใส่ข้อมูลรูปภาพใหม่เข้าไป
                    images: filterImage
                })

            })
            .catch((err) => console.log(err))

    }
    return (
        <div className='flex flex-col'>
            <h3 className='block text-md font-medium'>Images</h3>
            <div className='flex gap-5 my-2'>
                {
                    isLoading && <RiLoader4Fill color='#FFBB20' size={20} className='animate-spin mb-3' />
                }

                {
                    form.images?.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 rounded-md hover:scale-105'
                                src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute -top-3 -right-3 bg-gray-300 opacity-25 rounded-full p-1'>
                                <FaXmark className='w-5 h-5 text-black' />

                            </span>
                        </div>
                    )
                }
            </div>
            <input
                onChange={handleOnchange}
                type='file'
                className='block w-full  border-1 border-[#e7e7e7] rounded-md p-2'
                multiple
                accept='image/*'
            ></input>
        </div>
    )
}

export default UploadFile