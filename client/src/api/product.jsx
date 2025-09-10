import axios from 'axios'

export const createProduct = async (token, form) => {
    return axios.post('http://localhost:5000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async (count = 40) => {
    return axios.get('http://localhost:5000/api/products/' + count)
}

export const deleteProduct = async (token, id) => {
    return axios.delete('http://localhost:5000/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadImages = async (token, form) => {
    // console.log('form api fron', form)
    return axios.post('http://localhost:5000/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeImage = async (token, public_id) => {
    return axios.post('http://localhost:5000/api/removeImages', { public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const readProduct = async (token, id) => {
    return axios.get('http://localhost:5000/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return axios.put('http://localhost:5000/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    return axios.post('http://localhost:5000/api/search/filters', arg)
}


export const listProductBy = async (sort, order, limit) => {
    return axios.post('http://localhost:5000/api/productby', {
        sort, order, limit
    })
}