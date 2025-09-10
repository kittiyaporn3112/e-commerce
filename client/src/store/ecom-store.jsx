import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import { listProduct, searchFilters } from '../api/product'
import _ from 'lodash'
import { getOrderAdmin } from '../api/admin'

//get เข้าถึงตัวแปรใน ecomStore เหมือน this in javascript
const ecomStore = (set, get) => ({
    //ข้อมูลตรงนี้จะถูกเก็บเข้า storage
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    orders: [],
    logout: () => {
        set({
            user: null,
            token: null,
            carts: [],
        });
    },
    clearCart: () => {
        set({ carts: [] });
    },
    actionRemoveProduct: (prorductId) => {
        //ให้คืนค่าสินค้าโดยกรองไอดีที่ส่งมาออก
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== prorductId
            )
        }))
    },
    actionAddtoCart: (product) => {
        const carts = get().carts;
        const updateCart = [...carts, { ...product, count: 1 }];
        // Step Uniqe
        const uniqe = _.unionWith(updateCart, _.isEqual);
        set({ carts: uniqe });
    },
    actionUpdateQuantity: (productId, newQuantity) => {
        // console.log('Update Clickkkkk', productId, newQuantity)
        set((state) => ({
            //อัปเดตจำนวนใหม่ลงไปโดยการลูปเข้าไปใน carts 
            carts: state.carts.map((item) =>
                //ถ้า item.id === productId เป็นจริงให้ก๊อปค่าเดิมมาแล้วใส่ count ที่เป็นจำนวนมากสุดลงไปแทน
                item.id === productId
                    ? { ...item, count: Math.max(1, newQuantity) }
                    : item
            ),
        }));
    },
    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },
    //รับพารามิเตอร์คือ form
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:5000/api/login', form)

        //รับข้อมูลมาจากหลังบ้านมาเก็บไว้ใน user and token ข้างบน
        set({
            user: res.data.payload,
            token: res.data.token
        })
        //ส่งออกไปบอก
        return res
    },
    setUser: (user) => set({ user }),
    getCategory: async () => {
        try {
            const res = await listCategory()
            set({ categories: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            set({ products: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    getOrders: async (token) => {
        try {
            const res = await getOrderAdmin(token)
            set({ orders: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    actionSearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg)
            set({ products: res.data })
        } catch (err) {
            console.log(err)
        }
    },
})
//เก็บข้อมูลไว้ที่ localStorage
const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}
//usePersist เก็บข้อมูลลงใน  localstorage
const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore
