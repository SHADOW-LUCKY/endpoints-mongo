import Dbconnnection from '../config/database.js'
//2. Encontrar todas las hamburguesas de la categoría “Vegetariana”
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
//5. Encontrar todas las hamburguesas preparadas por “ChefB” 
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
//8. Agregar un nuevo ingrediente a la hamburguesa “Clásica”
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
//9. Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
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
//12. Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
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
//15. Listar las hamburguesas cuyo precio es menor o igual a $9
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
//18. Eliminar las hamburguesas que contienen menos de 5 ingredientes
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
//20. Listar las hamburguesas en orden ascendente según su precio
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
//23. Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
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

//37. Listar todas las hamburguesas con su descripción de categoría

export const hamncat = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([{$lookup : {
            from : 'categorias',
            localField : 'categoria',
            foreignField : 'nombre',
            as : 'categoriaDesc'
        }}]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

//39. Encontrar el precio promedio de las hamburguesas en cada categoría
export const avgprice = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([{$group: {_id: "$categoria", avg: {$avg: "$precio"}}}]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}