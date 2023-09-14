import Dbconnnection from '../config/database.js';

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
