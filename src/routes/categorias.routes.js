import {Router} from 'express'
import * as route from '../controllers/categorias.controllers.js'

const router = Router()

router.get('/findall', route.findall)
router.get('/contgourmet', route.contgourmet)
router.get('/maxcat', route.maxcat)

export default router