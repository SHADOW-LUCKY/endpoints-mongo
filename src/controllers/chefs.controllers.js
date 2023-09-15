import Dbconnnection from '../config/database.js';
//Encontrar todos los chefs que se especializan en “Carnes”
export const meatchef = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        const result = await collection.find({especialidad: 'Carnes'}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
    
}
//10. Cambiar la especialidad del “ChefC” a “Cocina Internacional”
export const international = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        
        const result = await collection.updateOne({nombre: 'ChefC'}, {$set: {especialidad: 'Cocina Internacional'}})

        result.acknowledged === true ? (
            res.status(200).json({message: 'Updated ChefC'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    }catch (error){
        console.log(error);
    }
}
//16. Contar cuántos chefs hay en la base de datos
export const countchef = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        const result = await collection.countDocuments()
        res.status(200).json({
            count:`hay ${result} chefs`
        })
    } catch (error) {
        console.log(error);
    }
    
}
//19. Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”
export const addasian = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        const newchef ={
            nombre: 'ChefD',
            especialidad: 'Cocina Asiática'
        }
        const result = await collection.insertOne(newchef)
            result.acknowledged === true ? (
                res.status(200).json({
                    message: 'New chef added',
                    newchef
                })
            ):(
                res.status(400).json({
                    message: 'Error'
                })
            )
    } catch (error) {
        console.log(error);
    }
}
//24. Listar todos los chefs excepto “ChefA”
export const exceptchefA = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        const result = await collection.find({nombre: {$ne: 'ChefA'}}).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
/* 29. Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana” */
export const quitvegan = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('chefs')
        const result = await collection.deleteMany({especialidad: 'Cocina Vegetariana'})
        result.acknowledged === true ? (
            res.status(200).json({message: 'Deleted all vegan chefs'})
        ): (
            res.status(400).json({message: 'Error'})
        )
    } catch (error) {
        console.log(error);
    }
}

//33. Listar los chefs junto con el número de hamburguesas que han preparado

export const listchef = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([
            { $unwind: "$chef" },
            { $group: { _id: "$chef", count: { $sum: 1 } } },
          ]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//35. Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado
export const totalcost = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([
            { $unwind: "$precio" },
            { $group: { _id: "$chef", count: { $sum: '$precio' } } },
          ]).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

//38. Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total
export const maxingredient = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([
            {$unwind : '$ingredientes'},
            {$group : { _id : '$chef', ingredientesCount : {$sum : 1}}},
            {$sort : {ingredientesCount : -1} },
            {$limit : 1}
        ]).toArray();

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

//40. Listar los chefs y la hamburguesa más cara que han preparado
export const maxpricechef = async (req , res) => {
    try {
        const db = await Dbconnnection()
        const collection = db.collection('hamburgesas')
        const result = await collection.aggregate([
            {$group : {_id : '$chef', hamburguesaCara : {$max : '$precio'}}},
            {$lookup : {from : 'chefs', localField : '_id', foreignField : 'nombre', as : 'chefData'}},
            {$project : {_id: 0, 'chefData.nombre' : 1, hamburguesaCara : 1}}
        ]).toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}