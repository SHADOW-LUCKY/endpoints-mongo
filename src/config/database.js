import {MongoClient} from 'mongodb'

export default async () => {
    try {
        const client = new MongoClient(process.env.MANGOS_URL)
        await client.connect()
        console.log('MongoDB connected')
        const db = client.db()
        return db
    } catch (error) {
        throw new Error(error.message)
    }
}