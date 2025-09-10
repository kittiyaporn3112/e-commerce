import axios from 'axios'

export const payment = async (token) =>
    await axios.post('http://localhost:5000/api/user/create-checkout-session', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
