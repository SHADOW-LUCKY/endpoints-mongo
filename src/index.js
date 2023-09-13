import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ingrdientesRoutes from './routes/ingrdientes.routes.js'
import hamburgesasRoutes from './routes/hamburgesas.routes.js'
import chefRoutes from './routes/chefs.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'

const app = express()
dotenv.config()
app.use(express.json())

const port = process.env.PORT
app.use(cors())

app.use(ingrdientesRoutes)
app.use(hamburgesasRoutes)
app.use(chefRoutes)
app.use(categoriasRoutes)

app.listen(port, ()=>{
    console.log(`server working on port ${port}`);
})