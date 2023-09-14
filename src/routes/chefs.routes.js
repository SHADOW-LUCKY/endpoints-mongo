import {Router} from 'express'
import * as route from '../controllers/chefs.controllers.js'

const router = Router()

router.get('/meatchef', route.meatchef)
router.patch('/international', route.international)
router.get('/countchef', route.countchef)
router.post('/addasian', route.addasian)
router.get('/exceptchefA', route.exceptchefA)
router.delete('/quitvegan', route.quitvegan)

export default router
