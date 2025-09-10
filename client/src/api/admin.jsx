import axios from "axios"

export const getOrderAdmin = async (token) => {
    return axios.get('http://localhost:5000/api/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateStatus = async (token, orderId, orderStatus) => {
    return axios.put('http://localhost:5000/api/admin/order-status', { orderId, orderStatus }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUser = async (token) => {
    return axios.get('http://localhost:5000/api/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const readOrder = async (token, id) => {
    return axios.get('http://localhost:5000/api/admin/order/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) => {
    return axios.post('http://localhost:5000/api/change-status', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeRole = async (token, value) => {
    return axios.post('http://localhost:5000/api/change-role', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const OrderCount = async (token) => {
    return axios.get('http://localhost:5000/api/orders/stats', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}