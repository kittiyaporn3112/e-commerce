//step 1 import...
//สร้างตัวแปรมารับ express เวลาเรียกใช้งานจะได้เรียกสั้นๆ
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
const helmet = require('helmet')
//middleware
app.use(morgan('dev'))

//ทำให้อ่าน json ออก
app.use(express.json({ limit: '20mb'}))
app.use(cors())

//ตั้งค่า Content Security Policy CSP
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "https:"],
            styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        },
    })
);


readdirSync('./routes').map((item)=> app.use('/api', require('./routes/' + item)) )




//step 2 Start server
app.listen(5000,()=> console.log('server is running on port 5000'))