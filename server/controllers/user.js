//ถ้า  router ไหนผ่าน middleware จะมี req.user.id อยู่ตลอด
const prisma = require('../config/prisma')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

exports.listUsers = async(req, res)=>{
    try {
        const users = await prisma.user.findMany({
            //เลือกเอาอะไรมาแสดงบ้าง
            select:{
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true,
                username: true
            }
        })
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}

exports.changeStatus = async(req, res)=>{
    try {
        const {id, enabled} = req.body
        console.log(id, enabled)

        const user = await prisma.user.update({
            //จะอัปเดตข้อมูลอันไหน
            where:{id: Number(id)},
            //อัปเดตอะไร
            data:{enabled: enabled}
        })
        res.send('Update Status Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}

exports.changeRole = async(req, res)=>{
    try {
        const {id, role} = req.body
        console.log(id, role)

        const user = await prisma.user.update({
            //จะอัปเดตข้อมูลอันไหน
            where:{id: Number(id)},
            //อัปเดตอะไร
            data:{role: role}
        })
        res.send('Update Role Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}
//เพิ่มของลงตระกร้า
exports.userCart = async(req, res)=>{
    try {
        //รับตระกร้ามาจากหน้าบ้าน
        const {cart} = req.body
        console.log(cart)
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where:{id: Number(req.user.id)}
        })
        //  console.log(user)
        // Delete old cart item

        //check quantity อ่านข้อมูลของ cart เอาแค่ข้อมูล products มาเก็บไว้ใน item
        for(const item of cart){
            console.log(item)
            //เข้าไปค้นหาข้อมูลสินค้าว่าจำนวนสินค้าที่เราซื้อมันมีน้อยกว่าหรือมากกว่าจำนวนที่ร้านค้ามี
            const product = await prisma.product.findUnique({
                //หาจาก id
                where:{ id: item.id },
                //เลือกเอาข้อมูล  quantity and title -> เอาไว้แจ้งบอกหน้าบ้านว่าอะไรหมด
                select: {quantity: true, title: true}
            })
            // console.log(product)
            //ถ้าจำนวนที่ซื้อมีมากว่าจำนวนสินค้าในปัจจุบัน
            if(!product || item.count > product.quantity){
                return res.status(400).json({ok: false, 
                    //product? คือ dyow;hถ้าไม่มีข้อมูลจะwfhไม่errer
                    message: `ขออภัยสินค้า ${product?.title || 'product'} หมด`})
            }
        }
        
        await prisma.productOnCart.deleteMany({
            where:{
                cart: {
                    orderedById: user.id
                }
            }
        })

        //Delete old cart
        await prisma.cart.deleteMany({
            where:{ orderedById: user.id}
        })

        //เตรียมสินค้า
        let products = cart.map((item)=>({
            productId: item.id,
            count: item.count,
            price: item.price
        }))

        //ราคารวมทั้งหมด
        let cartTotal = products.reduce((sum, item)=> 
            sum+item.price * item.count,0)

        //New cart
        const newCart = await prisma.cart.create({
            data:{
                products:{
                    create: products,                 
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })
        console.log(newCart)
        res.send('Add cart OK')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}
//ตระกร้าของฉัน
exports.getUserCart = async(req, res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                images: true  // ดึงข้อมูลรูปภาพทั้งหมดที่เชื่อมกับ product
                                }
                            }
                        }
                    }
                }
        })
        console.log(cart)
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}
//ลบตระกร้า
exports.emptyCart = async(req, res)=>{
    try {
        //หา order ของผู้ใช้คนนี้ จากนั้นเก็บไว้ในตัวแปร cart
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            }
        })
        if(!cart){
            return res.status(400).json({message: 'No cart'})
        }
        //ลบที่ตาราง productOnCart ก่อน
        await prisma.productOnCart.deleteMany({
            //ดึงไอดีมาจาก cart ที่ไปหามาด้านบน
            where: { cartId: cart.id}
        })

        const result = await prisma.cart.deleteMany({
            where:{ orderedById: Number(req.user.id) }
        })

        console.log(result)
        res.json({message: 'Cart emthy Success',
            deleteCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}

exports.saveAddress = async (req, res) => {
  try {
    //code
    const { address } = req.body;
    console.log(address);
    const addresssUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });

    res.json({ ok: true, message: "Address update success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveOrder = async(req, res)=>{
    try {
        const { id, amount, status, currency } = req.body.paymentIntent
        //step 1 get user cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products:true
            }
        })
        //check cart empthy
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({ok: false, message: 'Cart is Empthy'})        }

       
const amountTHB = Number(amount)/100
        //create a new order
        //สร้างออเดอร์ที่ตาราง Order
        const order = await prisma.order.create({
            //ส่งข้อมูล products, orderedBy, cartTotal
            data: { 
                //ลูปสร้างออเดอร์ทีละชิ้นที่ตาราง ProductOnOrder                
                products:{
                    create: userCart.products.map((item)=>({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                //บันทึกลงในตาราง Order
                orderedBy:{
                    connect:{ id: req.user.id }
                },
                cartTotal: userCart.cartTotal,
                stripePaymentId: id,
                amount: amountTHB,
                status: status,
                currency: currency
            }
        })

        //update product เตรียมอ็อบเจค
        const update = userCart.products.map((item)=>({
            //หาจาก productId
            where:{id: item.productId},
            //อัปเดต quantity, sold
            data:{
                //ลดจำนวนตามการซื้อ
                quantity: { decrement: item.count},
                //เพิ่มจำนวนตามการซื้อ
                sold: { increment: item.count}
            }
        }))
        console.log(update)

        //updated คือเอา where, data ใน update มาใส่
        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )

        //ลบในตระกร้าสินค้าของผู้ใช้ในตาราง cart และลบในตาราง ProductOnOrder ด้วย
        await prisma.cart.deleteMany({
            where:{orderedById: Number(req.user.id)}
        })

        res.json({ok: true, order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}

exports.getOrder = async(req, res)=>{
    try {
        const orders = await prisma.order.findMany({
            where:{ orderedById: Number(req.user.id)},
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                images: {
                                    select: {url: true}
                                    }
                                }
                            }
                        }
                    }
                }                
        })
        if(orders.length === 0){
            return res.status(400).json({ ok: false, message: 'No order'})
        }


        res.json({ok: true, orders})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})   
    }
}

exports.readProfile = async(req, res) => {
    try {
        const user = await prisma.user.findFirst({
           where:{
            id: Number(req.user.id)
           },
           select: {
            username: true,
            email: true,
            picture: true,
            address: true,
            }
        })

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}

exports.pictureProfile = async(req, res) => {
    try {

        const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } })

        if (user.public_id) {
            await cloudinary.uploader.destroy(user.public_id)
        }

         const result = await cloudinary.uploader.upload(req.body.picture, {
            public_id: `ecom-${Date.now()}`,
            resource_type: 'auto',
            folder: 'ecommerce'
        })

        // อัปเดต user table
        const update = await prisma.user.update({
            where: { id: req.user.id },
            data: { 
                picture: result.secure_url,
                public_id: result.public_id
            }
        })

     res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}

exports.updateProfile = async(req, res) => {
    try {
        const { username, address, picture } = req.body

        const data = {}
        if (username !== undefined) data.username = username.trim()
        if (address !== undefined) data.address = address.trim()
        if (picture !== undefined) data.picture = picture.trim()

    // ถ้าไม่ส่ง field มาเลย
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'กรุณาส่งข้อมูลที่ต้องการแก้ไข' })
        }

        const user = await prisma.user.update({
            where:{
                 id: Number(req.user.id)
            },
            data:data,
            select: {
            username: true,
            email: true,
            picture: true,
            address: true,
            }
        })

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}