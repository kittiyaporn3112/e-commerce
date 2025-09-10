import React, { useEffect, useState } from 'react'
import { changeRole, changeUserStatus, listUser } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import DropdownRole from '../form/DropdownRole'

const tableUser = () => {
    const token = useEcomStore((s) => s.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUser(token)
    }, [])

    const getUser = (token) => {
        listUser(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => console.log(err))
    }

    const handleChangeStatus = async (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                getUser(token)
            })
            .catch((err) => console.log(err))
    }

    const changeRoleUser = async (userId, userRole) => {
        const value = {
            id: userId,
            role: userRole
        }
        changeRole(token, value)
            .then((res) => {
                console.log(res)
                getUser(token)
            })
            .catch((err) => console.log(err))
    }

    return (
        <table className='w-full'>
            <thead className='border-b border-[#d1d5dc]'>
                <tr>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> ลำดับ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> ชื่อผู้ใช้ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> อีเมลล์ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> สิทธิ์ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-center font-thai pb-2'> สถานะ </th>
                    <th className='text-base  font-medium text-[#d1d5dc] text-left font-thai pb-2'> จัดการ </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-[#d1d5dc]'>
                {
                    users?.map((item, index) =>
                        <tr className='font-thai' key={index}>
                            <td >#{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td className='text-center py-3'>
                                <DropdownRole
                                    changeRole={(e) => changeRoleUser(item.id, e.target.value)}
                                    value={item.role}
                                />
                            </td>
                            <td className='text-center'>
                                {
                                    item.enabled
                                        ? <span className='bg-[#21C76C] text-white font-semibold text-sm py-1 px-3 rounded-md'>Active</span>
                                        : <span className='bg-[#E03125] text-white font-semibold text-sm py-1 px-3 rounded-md'>Inactive</span>
                                }
                            </td>
                            <td className='text-center py-3'>
                                <button className='border border-[#d1d5dc] rounded-md font-semibold text-sm py-1 px-3' onClick={() => handleChangeStatus(item.id, item.enabled)}>
                                    {item.enabled ? 'ปิด' : 'เปิด'}
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
export default tableUser