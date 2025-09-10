const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

exports.authCheck = async(req, res, next)=>{
    try {
        const headerToken = req.headers.authorization
        if(!headerToken){
            return res.status(401).json({message: 'no token, Authorization'})
        }
        //เอาแค่ token ตัดคำว่า Bearer อาร์เรย์ตัวนี้ [1] คือ token
        const token = headerToken.split(" ")[1]
        //ถอดรหัส
        const decode = jwt.verify(token,process.env.SECRET)
        //เพิ่มคีย์ user เข้าไปในอ็อบเจค req
        req.user = decode
        //หาว่ามี email user นี้จริงๆหรือป่าว โดยดึงข้อมูลจาก req.user และเข้าถึง email ของ user
        const user = await prisma.user.findFirst({
            where:{
                email: req.user.email
            }
        })
        if(!user.enabled){
            return res.status(400).json({message: 'this account cannot access'})
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Token Invalid'})
    }
}

exports.adminCheck = async(req, res, next)=>{
    try {
        const {email} = req.user
        const adminUser = await prisma.user.findFirst({
            where:{email: email}
        })

        if(!adminUser || adminUser.role !== 'admin'){
            return res.status(403).json({message: 'Access denied admin Only'})
        }
        // console.log('admin check', adminUser)
        next()
    } catch (err) {
        console.log(err)
        res.sattus(500).json({message: 'errer Admin access denied'})
    }
}