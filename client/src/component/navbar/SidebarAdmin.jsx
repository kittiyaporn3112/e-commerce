import React from 'react'
import Logo from '../../assets/logo2.svg'
import { NavLink, Link } from 'react-router-dom'
import { FaHashtag } from "react-icons/fa6";
import { FaBoxOpen, FaBookOpen } from "react-icons/fa";
import { BiSolidUserPin, BiLogOut } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import useEcomStore from '../../store/ecom-store';

const SidebarAdmin = () => {
    const logout = useEcomStore((s) => s.logout)
    return (
        <aside className='shadow w-60 px-5 py-5 h-screen flex flex-col'>
            <div className='flex gap-3 items-center'>
                <Link to={'/'}><img src={Logo} width={40} height={40}></img></Link>
                <h1 className=' font-bold text-xl'>Fullstopbook</h1>
            </div>
            {/* flex-1 ขยายให้เต็มพื้นที่ที่เหลือ */}
            <div className='mt-10 flex-1'>
                <NavLink
                    to="/admin"
                    end // 👈 ตรงนี้สำคัญ!
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center text-lg mb-5 font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                            : 'flex items-center text-base mb-5 font-medium py-2 px-3 text-[#d1d5dc]'
                    }
                >
                    <MdSpaceDashboard className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/order"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center text-lg mb-5 font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                            : 'flex items-center text-base mb-5 font-medium py-2 px-3 text-[#d1d5dc]'
                    }
                >
                    <FaBoxOpen className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                    Order
                </NavLink>
                <NavLink
                    to="/admin/category"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center text-lg mb-5 font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                            : 'flex items-center text-base mb-5 font-medium py-2 px-3 text-[#d1d5dc]'
                    }
                >
                    <FaHashtag className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                    Category
                </NavLink>
                <NavLink
                    to="/admin/product"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center text-lg mb-5 font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                            : 'flex items-center text-base mb-5 font-medium py-2 px-3 text-[#d1d5dc]'
                    }
                >
                    <FaBookOpen className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                    Product
                </NavLink>
                <NavLink
                    to="/admin/manage"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center text-lg mb-5 font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                            : 'flex items-center text-base mb-5 font-medium py-2 px-3 text-[#d1d5dc]'
                    }
                >
                    <BiSolidUserPin className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                    Manage
                </NavLink>
            </div>
            <NavLink
                to="/"
                onClick={() => logout()}
                className={({ isActive }) =>
                    isActive
                        ? 'flex items-center text-lg  font-bold py-2 px-3 text-white rounded-full bg-[#FFBB20] group'
                        : 'flex items-center text-base  font-medium py-2 px-3 text-[#d1d5dc]'
                }
            >
                <BiLogOut className="w-6 h-6 text-[#d1d5dc] transition mr-3 duration-75 group-visited:text-white" />
                Logout
            </NavLink>
        </aside>
    )
}

export default SidebarAdmin