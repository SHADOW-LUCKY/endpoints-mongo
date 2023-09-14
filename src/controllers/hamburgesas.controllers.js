import Dbconnnection from '../config/database.js'

export const allvegan = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({categoria: 'Vegetariana'}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

export const allchefb = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({chef: 'ChefB'}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

export const addclassic = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')

        const {newIng} = req.body

        const result = await collection.updateOne({nombre: 'Clásica'}, {$push: {ingredientes: newIng}})
        
        result.acknowledged === true ? (
            res.status(200).json({message: 'Added new ingredient'})
        ):(
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
}

export const findintegral = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({ingredientes: 'Pan integral'}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

export const notchesse = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({ingredientes:{$ne: 'Queso cheddar'}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

export const lessnine = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({precio: {$lt: 9}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

export const lessfive = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.deleteMany({
            $expr: { $lt: [{ $size: "$ingredientes" }, 5] },
          })
        result.acknowledged === true?(
            res.status(200).json({
                msg: 'borradas hamburgesas con menos de 5 ingrdientes'
            })
        ):(
            res.status(400).json({
                msg: 'error'
            })
        )
    } catch (error) {
        console.log(error);
    }
}

export const ascentham = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({}).sort({precio: 1}).toArray()
    res.status(200).json({
        msg:'hamburgesas ordenadas de mayor a menor',
        result
    })
    } catch (error) {
        console.log(error);
    }

}

export const findtomatoandonion = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({ingredientes:{$in: ['Tomate','Cebolla']} }).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
/*25. Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”  */

export const gourmetbytwo = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.updateMany({categoria: 'Gourmet'}, {$inc: {precio: 2}})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Updated gourmet'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    }catch (error){
        console.log(error);
    }
}
/* 27. Encontrar la hamburguesa más cara */
export const maxprice = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({}).sort({precio: -1}).limit(1).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
/* 28. Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica” */

export const pepinillos = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.updateMany({categoria: 'Clásica'}, {$push: {ingredientes: 'Pepinillos'}})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Added pepinillos'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    }catch (error){
        console.log(error);
    }
}

/* 30. Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes */

export const sevening = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({ingredientes: {$size: 7}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

/* 31. Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet” */

export const gourmetchef = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.find({categoria: 'Gourmet'}).sort({precio: -1}).limit(1).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}