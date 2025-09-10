const express = require('express')
const { 
    listUsers, 
    changeStatus, 
    changeRole, 
    userCart, 
    getUserCart, 
    emptyCart, 
    saveAddress, 
    saveOrder, 
    getOrder, 
    updateProfile,
    readProfile,
    pictureProfile
} = require('../controllers/user')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const router = express.Router()

//authCheck เป็นด่านตรวจคนเข้าเมือง ถ้ามีคำว่า next() ซึ่งเป็นใบอนุญาตก็กจะไปทำ listUsers ถ้าไม่มีก็ไม่ต้องไป
router.get('/users',authCheck, adminCheck, listUsers)
router.post('/change-status', authCheck, changeStatus)
router.post('/change-role', authCheck, changeRole)

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)

router.post('/user/address', authCheck,saveAddress)
router.put('/user/update-profile', authCheck, updateProfile)
router.post('/user/picture', authCheck, pictureProfile)
router.get('/user/readprofile', authCheck, readProfile)

router.post('/user/order', authCheck, saveOrder)
router.get('/user/order', authCheck, getOrder)

module.exports = router