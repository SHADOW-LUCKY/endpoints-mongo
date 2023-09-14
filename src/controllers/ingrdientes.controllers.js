import Dbconnnection from '../config/database.js'

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
        const collection = db.collection('ingredientes')
        const result = await collection.aggregate([{$unwind: '$ingredientes'},{$group:{_id: '$ingrdientes', count: {$sum: 1}}}]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
