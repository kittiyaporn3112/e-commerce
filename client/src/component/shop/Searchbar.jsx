import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store';
import SearchBox from '../form/SearchBox'
import PriceRangeSlider from './PriceRangeSlider';
import SearchByCategory from './SearchByCategory';

const Searchbar = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setCategotySelected] = useState([])
    const [price, setPrice] = useState([0, 1000]);
    const [ok, setOk] = useState(false)

    //step 1 search text
    //ติดตามการทำงานของ text ว่ามีการเสิร์ชหาข้อมูลหรือไม่
    useEffect(() => {
        const deley = setTimeout(() => {
            actionSearchFilters({ query: text })
            if (!text) {
                getProduct()
            }
        }, 500)
        return () => clearTimeout(deley)
    }, [text])



    //step 2 search by category
    useEffect(() => {
        getCategory()
    }, [])

    const handleCheck = (e) => {
        // console.log(e.target.value)
        const inCheck = e.target.value // ค่าที่เรา ติ๊ก
        //ก๊อปค่าเดิมจากแสตทที่ประกาศไว้คือ อาร์เรย์ว่างๆ
        const inState = [...categorySelected]
        //เข้าไปค้นหาตำแหน่ง index ของ inState ถ้าไม่เจอจะรีเทิร์น -1
        const findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            //ถ้าอาร์เรย์ว่างให้เพิ่มค่าที่ถูกเช็ค
            inState.push(inCheck)
        } else {
            //ถ้าไม่ใช่อาร์เรย์ว่างให้ลบค่าที่ถูกเช็คออกครั้งละ 1
            inState.splice(findCheck, 1)
        }
        setCategotySelected(inState)


        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }

    //step 3 search by price
    useEffect(() => {
        //ส่งไปเป็นออบเจ็ค
        actionSearchFilters({ price })
    }, [ok])

    const handleRangeChange = (values) => {
        setPrice([values.min, values.max]);
        setTimeout(() => {
            setOk((prev) => !prev);
        }, 500);
    };

    return (
        <div>
            <p className='mb-5 text-lg font-work font-semibold'>Filter Options</p>
            <SearchBox
                className='w-45'
                placeholder='Search...'
                onChange={(e) => setText(e.target.value)}
            />
            <hr className='h-px bg-gray-200 border-0 my-5'></hr>
            <SearchByCategory
                categories={categories}
                onClick={handleCheck}
            />
            <hr className='h-px bg-gray-200 border-0 my-5'></hr>
            <PriceRangeSlider
                min={200}
                max={1000}
                onChange={handleRangeChange}
            />
        </div>
    )
}

export default Searchbar