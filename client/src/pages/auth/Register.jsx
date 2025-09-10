import React, { useState } from 'react'
import axios from 'axios'
import Image from '../../assets/login.svg'
import FormInput from '../../component/form/FormInput'
import Button from '../../component/form/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../component/toast/toastService'
import ToastSuccess from '../../component/toast/ToastSuccess'
import ToastError from '../../component/toast/ToastError'

const Register = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    })

    const registerOnChange = (e) => {
        //... เปรียบเหมือนการคัดลอกออบเจ็คของ form มา
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        //ป้องกันการรีเฟรช
        e.preventDefault()
        const validation = {}
        if (!form.username.trim()) {
            validation.username = 'กรุณากรอกชื่อผู้ใช้'
        } else if (form.username.length < 3) {
            validation.username = 'ชื่อผู้ใช้ต้องมี 3 ตัวอักษรขึ้นไป'
        }

        if (!form.email.trim()) {
            validation.email = 'กรุณากรอกอีเมลล์'
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            validation.email = 'อีเมลล์ไม่ถูกต้อง'
        }

        if (!form.password.trim()) {
            validation.password = 'กรุณากรอกรหัสผ่าน'
        } else if (form.password.length < 6) {
            validation.password = 'รหัสผ่านต้องมี 6 ตัวขึ้นไป'
        }

        setError(validation)
        //ถ้า validation มีมากกว่า 0 ให้รีเทิร์นไม่ไม่ทำเพิ่มข้อมูลได้
        if (Object.keys(validation).length > 0) {
            return;
        }
        try {
            //ส่งข้อมูลผ่าน axios โดยใช้ (url หลังบ้าน, ข้อมูลที่ส่ง)
            const res = await axios.post('http://localhost:5000/api/register', form)
            toast.open(<ToastSuccess message='สร้างบัญชีผู้ใช้สำเร็จ' />)
            navigate('/login')
        } catch (err) {
            const errMsg = err.response?.data?.message
            console.log(err)
            toast.open(<ToastError message={errMsg} />)
        }
    }

    return (
        <div className='grid grid-cols-2 h-dvh'>
            <div className='bg-black h-screen px-20 flex flex-col gap-10 items-center justify-center'>

                <img src={Image} className='w-50 h-50 rounded-full shadow-[0_0px_10px_white]'></img>
                <h1 className='text-white text-2xl font-bold font-work'>fullstopbook</h1>
                <h2 className='text-white font-thai px-15 text-center'>ร้านหนังสือออนไลน์ของสำนักพิมพ์ฟูลสต๊อป จำหน่ายหนังสือแนะนำท่องเที่ยวต่างประเทศ หนังสือนิยายภาพ สมุดโน๊ต</h2>

            </div>
            <div className='flex flex-col items-center justify-center font-work'>

                <div>
                    <div className='text-start mb-10'>
                        <h1 className='font-bold text-4xl mb-2'>Welcome to fullstopbook!</h1>
                        <h2>Create to youre account</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            func={registerOnChange}
                            name='username'
                            type='text'
                            placeholder='Enter your username'
                            className='w-md'
                            error={error.username}
                        />
                        <FormInput
                            func={registerOnChange}
                            name='email'
                            type='email'
                            placeholder='your_email@gmail.com'
                            className='w-md'
                            error={error.email}
                        />
                        <FormInput
                            func={registerOnChange}
                            name='password'
                            type='password'
                            placeholder='Password'
                            className='w-md'
                            error={error.password}
                        />
                        <Button
                            text='Register'
                            className='w-md bg-black text-white'
                        />
                    </form>
                    <div className='flex gap-2 mt-10'>
                        <span className='text-[#e7e7e7]'>You have an account?</span>
                        <Link to='/login'>
                            <span className='hover:underline'>Login now</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register