import React, { useState, useEffect, useRef } from 'react'
import { IoMdMore } from "react-icons/io";

const Dropdown = ({ onDelete, id, onEdit }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside  ปิดเมนูเมื่อคลิกนอกเมนู
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    return (
        <div className='flex justify-center'>
            <div className='relative inline-block'>
                <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-[#D2D5DF]/25" ref={trigger}
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <IoMdMore size={20} />
                </button>
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                    className={`absolute right-12 -top-3  w-[90px] overflow-hidden rounded-lg shadow-sm bg-white ${dropdownOpen ? 'block' : 'hidden'}`}
                >
                    <button className='w-full px-4 py-1 text-sm font-medium text-dark hover:bg-[#D2D5DF]/25' onClick={onEdit}>
                        Edit
                    </button>
                    <hr className='h-px bg-gray-200 border-0'></hr>
                    <button className='w-full items-center gap-3 px-4 py-1 text-sm font-medium text-red-600 hover:bg-[#D2D5DF]/25' onClick={() => onDelete(id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dropdown