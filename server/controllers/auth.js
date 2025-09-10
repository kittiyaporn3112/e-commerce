const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async(req, res)=>{
    try {
        const {username, email, password} = req.body

        //step 1 validate body
        if(!email){
            return res.status(400).json({message: 'email is require!'})
        }
        if(!password){
            return res.status(400).json({massage: 'password is require!'})
        }
        
        //step 2 check email in db ว่ามีหรือเปล่า
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        //ถ้ามี email ให้ return ออกไป
        if(user){
            return res.status(400).json({message: 'email already exits!!'})
        }

        //Step 3 HashPassword
        const hashPassword = await bcrypt.hash(password,10)

        //step 4 register
        await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: hashPassword
            }
        })
        
        res.send('Register success!!✨')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    } 
}

exports.login = async(req, res)=>{
    try {
        const {email, password} = req.body

        //step 1 check email เก็บข้อมูลที่หามาได้ใส่ไว้ใน user
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({message: 'ไม่พบอีเมลล์ผู้ใช้'})
        }

        //step 2 check password  bcrypt.compare ใช้ตรวจสอบว่ารหัสผ่านที่ผู้ใช้กรอก (password) ตรงกับรหัสผ่านที่เก็บในฐานข้อมูล (user.password) หรือไม่
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'รหัสผ่านไม่ถูกต้อง'})
        }
        //step 3 create payload เตรียมข้อมูล payload เพื่อฝังลงใน JWT Token
        const payload ={
            id: user.id,
            email: user.email,
            role: user.role,
            enabled: user.enabled,
        }
        //step 4 generate token สร้าง JWT token โดยใช้ 🥷 payload ที่เราสร้างไว้, 🔑SECRET ที่เป็นรหัสลับอยู่ใน .env (ใช้สำหรับเข้ารหัส/ถอดรหัส token), 🔖expiresIn: '1d' = ให้ token หมดอายุใน 1 วัน
        jwt.sign(payload,process.env.SECRET,{ expiresIn: '1d'},/*หลังคอมมาคือคอลแบคฟังก์ชันรับพารามิเตอร์สองตัวคือถ้ามีข้อผิดพลาดจะเก็บไว้ที่ err แต่ถ้าสำเร็จได้โทเคนจะเก็บไว้ที่ token*/(err, token)=>{
            if(err){
                return res.status(500).json({message: 'server errer'})
            }
            //ถ้าไม่มีปัญหา
            res.json({payload, token})
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    } 
}


exports.currentUser = async(req, res)=>{
    try {
        const user = await prisma.user.findFirst({
            where: {email: req.user.email},
            select: {
                id:  true,
                email: true,
                username:true,
                role: true
            }
        })
        res.json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}
