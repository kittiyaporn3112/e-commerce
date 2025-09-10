import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layoute from '../layouts/Layoute'
import LayoutAdmin from '../layouts/LayoutAdmin'
import DashBoard from '../pages/admin/DashBoard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import Order from '../pages/admin/Order'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import History from '../pages/user/History'
import DetailOrder from '../pages/admin/DetailOrder'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layoute />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <CheckOut /> },
        ]
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <DashBoard /> },
            { path: 'order', element: <Order /> },
            { path: 'order/:id', element: <DetailOrder /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'product/:id', element: <EditProduct /> },
            { path: 'manage', element: <Manage /> }
        ]
    },
    {
        path: '/user',
        // element: <LayoutUser />,
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: 'payment', element: <Payment /> },
            { path: 'history', element: <History /> },
        ]

    }
])
const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />

        </>
    )
}

export default AppRoutes