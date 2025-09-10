const prisma = require('../config/prisma') 
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

exports.create = async(req, res)=>{
    try {
        const { title, writer, description, price, quantity, categoryId, images } = req.body

        const product = await prisma.product.create({
            data:{
                //ชื่อที่อยู่ทางขวาคือชื่อในฐานข้อมูล ส่วนทางซ้ายคือชื่อสิ่งที่หน้าบ้านส่งมา
                title: title,
                writer: writer,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images:{
                    //return ออกไปเป็น object
                    create: images.map((item)=>({
                        asset_id: item.asset_id,
                        public_id:item.public_id,
                        url:item.url,    
                        secure_url:item.secure_url,
                    }))
                }
            }
        })
        
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.list = async(req,res)=>{
    try {
        const { count } = req.params
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: 'asc' },
            include:{
                category:true,
                images:true
            }
        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}
exports.read = async(req,res)=>{
    try {
        const { id } = req.params
        const products = await prisma.product.findFirst({
           where:{
            id: Number(id)
           },
            include:{
                category:true,
                images:true
            }
        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.update = async(req, res)=>{
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        //clear images
        await prisma.image.deleteMany({
            where:{
                productId: Number(req.params.id)
            }
        })

        const product = await prisma.product.update({
            where:{
                id:  Number(req.params.id)
            },
            data:{
                //ชื่อที่อยู่ทางขวาคือชื่อในฐานข้อมูล ส่วนทางซ้ายคือชื่อสิ่งที่หน้าบ้านส่งมา
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images:{
                    //return ออกไปเป็น object
                    create: images.map((item)=>({
                        asset_id: item.asset_id,
                        public_id:item.public_id,
                        url:item.url,    
                        secure_url:item.secure_url,
                    }))
                }
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.remove = async(req, res)=>{
    try {
        const { id } = req.params

        //หนังชีวิต
        //step 1 เอาไอดีที่ได้มาไปค้นหา 
          const product = await prisma.product.findFirst({
            where: { id: Number(id) },
            include: { images: true }
        })
        if(!product){
            return res.status(400).json({message: 'Produnc not found'})
        }

        //step 2 promise ลบแบบรอกันด้วย ลบรููปภาพ
        //เข้าถึงรูปภาพของ product.images ที่ได้มาข้างบน
       const deleteImage = product.images.map((image)=>
            new Promise((resolve, reject)=>{
                //ลบจาก clound
                cloudinary.uploader.destroy(image.public_id,(error, result)=>{
                    if(error) reject(error)
                    else resolve(result)
                })
            })
        )
        //รอรูปภาพลบหมด
        await Promise.all(deleteImage)

        //จากนั้นทำ step 3 ลบสินค้า
       await prisma.product.delete({
            where:{
                id: Number(id)
            }
        })

        res.send('ลบสินค้าสำเร็จ')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.listby = async(req, res)=>{
    try {
        const { sort, order, limit } = req.body
        console.log(sort, order, limit)

        const products = await prisma.product.findMany({
            take: limit,
            orderBy:{ [sort]:order },
            include:{ 
                category:true,
                images:{
                    select: {url: true}
                }
            }
        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

//เอามาเสิร์ชในฐานข้อมูล แล้วส่งข้อมูลออกไป
const handleQuery = async(req, res, query)=>{
    try {
        const products = await prisma.product.findMany({
            where:{
                title:{
                    contains: query,
                }
            },
            include:{
                category:true,
                images:true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'search error'})
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error ' })
    }
}

const handleCategory = async(req, res, categoryId)=>{
    const products = await prisma.product.findMany({
        where:{
            categoryId: {
                in: categoryId.map((id)=> Number(id))
            }
        },
        include:{
            category:true,
            images:true
        }
    })

    res.send(products)
}

exports.searchFilters = async (req, res) => {
    try {
        // code
        const { query, category, price } = req.body

        if (query) {
            console.log('query-->', query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log('category-->', category)
            await handleCategory(req, res, category)
        }
        if (price) {
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}


exports.createImages = async(req, res)=>{
    try {       
         const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `ecom-${Date.now()}`,
            resource_type: 'auto',
            folder: 'ecommerce'
        })
     res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.removeImages = async(req, res)=>{
    try {
        const { public_id } = (req.body)

        cloudinary.uploader.destroy(public_id,(result)=> {
            res.send('remove image successfully')
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}