import axios from 'axios'

//เขียนฟังก์ชันแบบย่อ
export const currentUser = async (token) => await axios.post('http://localhost:5000/api/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//เขียนฟังก์ชันแบบเต็ม
export const currentAdmin = async (token) => {
    return await axios.post('http://localhost:5000/api/current-admin', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}