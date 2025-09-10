import React, { useState } from 'react'
import Resize from 'react-image-file-resizer'
import useEcomStore from '../../store/ecom-store'
import Profile from '../../assets/logo2.svg'
import { RiLoader4Fill } from "react-icons/ri";
import { pictureProfile } from '../../api/user'

const UploadProfile = ({ form, setForm }) => {
    const [isLoading, setLoading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnchange = (e) => {
        // setLoading(true)
        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }

        if (fileInput) {
            setLoading(true)
            try {
                Resize.imageFileResizer(
                    e.target.files[0],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    async (data) => {
                        //endpoit backend
                        pictureProfile(token, data)
                        try {
                            const res = await pictureProfile(token, data)

                            setForm({
                                ...form,
                                picture: res.data.secure_url // ใช้ URL ที่ส่งกลับมา
                            })
                            setLoading(false)
                        } catch (err) {
                            console.log(err)
                        }
                    },
                    "base64"
                );
            } catch (err) {
                console.log(err);
            }
        }

    }

    return (
        <div className='flex flex-col'>
            {
                form.picture ? (
                    <div className='w-50 rounded-md mb-3 relative'>
                        <img src={form.picture} className='w-full object-contain rounded-md' />
                        <input
                            onChange={handleOnchange}
                            type='file'
                            className='w-50 bg-gray-100/50 rounded-md p-2 absolute bottom-0'
                            accept='image/*'
                        ></input>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300/25 rounded-md">
                                <RiLoader4Fill
                                    color="#FFBB20"
                                    size={30}
                                    className="animate-spin"
                                />
                            </div>
                        )}
                    </div>
                )
                    : <div className='w-50 h-50 relative rounded-md mb-3 bg-yellow flex justify-center items-center'>
                        <img src={Profile} className='w-20' />
                        <input
                            onChange={handleOnchange}
                            type='file'
                            className='w-50 bg-gray-100/50 rounded-md p-2 absolute bottom-0'
                            accept='image/*'
                        ></input>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300/25 rounded-md">
                                <RiLoader4Fill
                                    color="#FFBB20"
                                    size={30}
                                    className="animate-spin"
                                />
                            </div>
                        )}
                    </div>
            }
        </div>
    )
}

export default UploadProfile