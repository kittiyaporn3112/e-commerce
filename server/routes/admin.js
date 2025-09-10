const express = require('express')
const { listOrders, changeOrderStatus, getOrderStats, readOrder } = require('../controllers/admin')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.put('/admin/order-status', authCheck,  changeOrderStatus)
router.get('/admin/orders', authCheck, listOrders)
router.get('/orders/stats', getOrderStats)
router.get('/admin/order/:id', authCheck, readOrder)

module.exports = router