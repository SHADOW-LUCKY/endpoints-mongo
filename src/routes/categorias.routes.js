import {Router} from 'express'
import {findall,contgourmet} from '../controllers/categorias.controllers.js'

const router = Router()

router.get('/findall', findall)
router.get('/contgourmet', contgourmet)

export default router