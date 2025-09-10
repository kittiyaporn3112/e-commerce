const prisma = require("../config/prisma")

exports.create = async(req, res) => {
    try {
        const {name} = req.body

        const category = await prisma.category.create({
            data:{
                name: name
            }
        })
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}

exports.list = async(req, res) =>{
    try {
        const category = await prisma.category.findMany()
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}

exports.remove = async(req, res) =>{
    try {
        const { id } = req.params
        
        const category = await prisma.category.delete({
            where:{ 
                //สิ่งที่ส่งมาจากหน้าบ้านเป็นสตริงต้องแปลงเป็นตัวเลข
                id: Number(id)
             }
        })
        res.send('🗑️ Remove Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server errer'})
    }
}