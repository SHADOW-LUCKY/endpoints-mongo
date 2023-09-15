import Dbconnnection from '../config/database.js'
//1. Encontrar todos los ingredientes con stock menor a 400
export const lessthan = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.find({stock: {$lt: 400}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//4. Aumentar en 1.5 el precio de todos los ingredientes
export const multiply = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
       const result = await collection.updateMany({},{$mul:{precio: 1.5}})

        result.acknowledged === true ? (
            res.status(200).json({message: 'Updated all ingredients'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
}
//7. Eliminar todos los ingredientes que tengan un stock de 0 
export const delifzero = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.deleteMany({stock: 0})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Deleted all ingredients that have 0 stock'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
    
}
//11. Encontrar el ingrediente más caro 
export const maxprice = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.find({}).sort({precio: -1}).limit(1).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//13. Incrementar el stock de “Pan” en 100 unidades
export const panplus = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.updateOne({nombre: 'Pan'}, {$inc: {stock: 100}})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Updated Pan'})
        ):(
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
}
//14. Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
export const findclassic = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.find({descripcion:{$regex: /Clásico/i }}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//21. Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
export const betweennum = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.find({precio: {$gte: 2, $lte: 5}}).toArray()
        result.length === 0 ? (
            res.status(200).json({message: 'No ingredients with price between 2 and 5'})  
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        console.log(error);
    }
}
//22. Actualizar la descripción del “Pan” a “Pan fresco y crujiente”
export const nicebread = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.updateOne({nombre: 'Pan'},{$set :{nombre : 'Pan fresco y crujiente'}})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Updated Pan'})
        ):(
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
}
/* 26. Listar todos los ingredientes en orden alfabético */
export const listABC = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('ingredientes')
        const result = await collection.find({}).sort({nombre: 1}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
    
}

/* 32. Listar todos los ingredientes junto con el número de hamburguesas que los contienen */
export const listall = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([
            { $unwind: "$ingredientes" },
            { $group: { _id: "$ingredientes", count: { $sum: 1 } } },
          ]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

//36. Encontrar todos los ingredientes que no están en ninguna hamburguesa
export const notinany = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const hamburgesas = db.collection('hamburgesas')
        const ingrdientes = db.collection('ingredientes')

        const ninHamburgesas = await hamburgesas.distinct('ingredientes')
        const result = await ingrdientes.find({nombre:{$nin: ninHamburgesas}}).toArray()
        
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}