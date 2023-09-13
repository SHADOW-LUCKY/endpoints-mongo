import {Router} from 'express'
import {meatchef, international,countchef,addasian} from '../controllers/chefs.controllers.js'

const router = Router()

router.get('/meatchef', meatchef)
router.patch('/international', international)
router.get('/countchef', countchef)
router.post('/addasian', addasian)

export default router
