import Dbconnnection from '../config/database.js'

export const findall = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('categorias')
        const result = await collection.find({}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//17. Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
export const contgourmet = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('categorias')
        const result = await collection.find({descripcion: {$regex: /Gourmet/i}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//34. Encuentra la categoría con la mayor cantidad de hamburguesas
export const maxcat = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburguesas')
        const result = await collection.aggregate([
            {$group: {_id: "$categoria",totalHamburguesas: { $sum: 1 },},},
            {$sort: { totalHamburguesas: -1 },},{$limit: 1,}])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}