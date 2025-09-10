import React, { useEffect, useState } from 'react'
import CardUser from '../../component/card/CardUser'
import useEcomStore from '../../store/ecom-store'
import { useNavigate, useParams } from 'react-router-dom'
import { changeUserStatus } from '../../api/admin'
import { useToast } from '../../component/toast/toastService'
import ToastError from '../../component/toast/ToastError'
import { readProfile, updateProfile } from '../../api/user'
import ToastSuccess from '../../component/toast/ToastSuccess'
import UploadProfile from '../../component/form/UploadProfile'

const initialState = {
    "username": "gogeee",
    "email": "miwa@gmail.com",
    "picture": "",
    "address": "ny"
}

const HomeUser = () => {
    const token = useEcomStore((s) => s.token)
    const user = useEcomStore((s) => s.user)
    const setUser = useEcomStore((s) => s.setUser)
    const navigate = useNavigate()
    const toast = useToast()
    const { id } = useParams()
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        fetchProfile(token)
    }, [token])

    const fetchProfile = async (token) => {
        try {
            const res = await readProfile(token)
            setForm(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProfile(token, form)
            console.log(res)
            setUser(res.data)
            fetchProfile(token)
            toast.open(<ToastSuccess message='แก้ไขข้อมูลสำเร็จ' />)
        } catch (err) {
            console.log(err)
            toast.open(<ToastError message={err.response?.data?.message} />)
        }
    }

    const handleChangeStatus = async (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                setUser({
                    ...user,
                    enabled: !userStatus,
                })
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='flex justify-center'>
            <div className='mt-10 max-w-lg rounded-md shadow bg-white flex flex-col items-center md:w-lg p-5 '>
                <UploadProfile
                    form={form}
                    setForm={setForm}
                />
                <CardUser
                    enabled={() => handleChangeStatus(user.id, user.enabled)}
                    onChange={handleOnChange}
                    onUpdate={handleSubmit}
                    setForm={setForm}
                    form={form} />
            </div>
        </div>
    )
}

export default HomeUser