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