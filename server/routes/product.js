const express = require('express')
const { create, list, remove, listby, searchFilters, update, read, removeImages, createImages } = require('../controllers/product')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')

//@ENDPOINT http://localhost:5000/api/product
router.post('/product', create)
router.get('/products/:count', list)
router.put('/product/:id', update) 
router.get('/product/:id', read) 
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)
router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimages', authCheck, adminCheck, removeImages)

module.exports = router