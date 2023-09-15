import {Router} from 'express'
import * as route from '../controllers/chefs.controllers.js'

const router = Router()

router.get('/meatchef', route.meatchef)
router.patch('/international', route.international)
router.get('/countchef', route.countchef)
router.post('/addasian', route.addasian)
router.get('/exceptchefA', route.exceptchefA)
router.delete('/quitvegan', route.quitvegan)
router.get('/listchef', route.listchef)
router.get('/totalcost', route.totalcost)
router.get('/maxingredient', route.maxingredient)
router.get('/maxpricechef', route.maxpricechef)


export default router
