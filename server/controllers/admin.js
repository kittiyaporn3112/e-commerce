const prisma = require("../config/prisma")

exports.changeOrderStatus = async(req, res)=>{
    try {
        const { orderId, orderStatus } = req.body
        const orderUpdate = await prisma.order.update({
            where: { id: orderId },
            data:{
                orderStatus: orderStatus
            }
        })

        res.json(orderUpdate)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.listOrders = async(req, res)=>{
    try {
        const orders = await prisma.order.findMany({
            include:{
                products: {
                    include: {
                        product:true
                    }
                },
                orderedBy: {
                    select: {
                        id:true,
                        username:true,
                        email:true,
                        address:true
                    }
                }
            }
        })

        res.json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

exports.readOrder = async(req, res) => {
  try {
     const { id } = req.params
     const order = await prisma.order.findFirst({
      where: { id: Number(id) },
      include:{
        products: {
                    include: {
                        product: {
                          include: {
                            images: {
                              select: {
                                url: true
                              }
                            }
                          }
                        }
                    }
                },
                orderedBy: {
                    select: {
                        id:true,
                        username:true,
                        picture: true,
                        email:true,
                        address:true
                    }
                }
      }
     })

    res.send(order)
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'server error'})
  }
}

exports.getOrderStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // หาวันถัดไป (เที่ยงคืนของวันพรุ่งนี้)
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    // นับออเดอร์ตามวัน
    const count = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    });

    // นับออเดอร์ตามสถานะ
    const ordersByStatus = await prisma.order.groupBy({
      by: ['orderStatus'],
      _count: { id: true }
    })

    res.json({
      byDay: count,
      byStatus: ordersByStatus
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}