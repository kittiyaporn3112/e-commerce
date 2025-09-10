import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo2.svg'
import useEcomStore from '../../store/ecom-store'
import ProfileDropdown from './ProfileDropdown'
import { readProfile } from '../../api/user'

const Navbar = () => {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const logout = useEcomStore((s) => s.logout)
    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        if (token) {
            readProfile(token).then((res) => {
                setDataUser(res.data.picture
                ) // ข้อมูลเต็มจาก backend
            })
        }
    }, [token])
    return (
        <nav className='shadow'>
            <div>
                <div className='flex justify-between px-5 py-2 items-center font-work'>
                    <div className='flex gap-3 items-center'>
                        <Link to={'/'}>
                            <img src={Logo} width={40} height={40} className='flex-shrink-0 cursor-pointer'></img>
                        </Link>
                        <h1 className=' font-bold text-xl flex-1'>fullstopbook</h1>
                    </div>
                    <div>
                        <ul className='flex items-center font-medium gap-5 '>
                            <li>
                                <Link to='/' className='relative inline-block py-2 px-3  hover:text-[#FFBB20]  group'>
                                    <span className='hidden w-12 h-1 bg-[#FFBB20]  left-1/2 transform -translate-x-1/2 absolute mt-2  bottom-2 group-hover:block'>
                                    </span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/shop' className='relative inline-block py-2 px-3  hover:text-[#FFBB20]  group'>
                                    <span className='hidden w-12 h-1 bg-[#FFBB20]  left-1/2 transform -translate-x-1/2 absolute mt-2  -bottom-2 group-hover:block'>
                                    </span>
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to='/cart' className='relative inline-block py-2 px-3  hover:text-[#FFBB20]  group'>
                                    <span className='hidden w-12 h-1 bg-[#FFBB20]  left-1/2 transform -translate-x-1/2 absolute mt-2  -bottom-2 group-hover:block'>
                                    </span>
                                    Cart
                                    {
                                        carts.length > 0 && (
                                            <span className='absolute top-1  right-1 rounded-full w-4 h-4 bg-yellow flex justify-center items-center border-2 border-white'>
                                                <p className=' text-white  text-xs'>{carts.length}</p>
                                            </span>
                                        )
                                    }

                                </Link>
                            </li>
                            <li>
                                {
                                    user && user.enabled
                                        ? <ProfileDropdown
                                            logout={() => logout()}
                                            user={dataUser}
                                        />

                                        : <Link to='/login' className='relative inline-block py-2 px-3  hover:text-[#FFBB20]  group'>
                                            <span className='hidden w-12 h-1 bg-[#FFBB20]  left-1/2 transform -translate-x-1/2 absolute mt-2  -bottom-2 group-hover:block'>
                                            </span>
                                            Login
                                        </Link>
                                }

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

{/* <div className='flex gap-5 font-medium'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/'}>Shop</Link>
                        <Link to={'/'} className='flex gap-2 items-center'>Cart</Link>
                        <Link to={'/login'}>Login</Link>
                    </div> */}