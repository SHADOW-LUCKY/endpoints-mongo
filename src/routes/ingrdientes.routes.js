import {Router} from 'express'
import * as route from '../controllers/ingrdientes.controllers.js'

const router = Router()

router.get('/lessthan', route.lessthan)
router.get('/multiply', route.multiply)
router.delete('/delifzero',route.delifzero)
router.get('/maxprice', route.maxprice)
router.patch('/panplus', route.panplus)
router.get('/findclassic', route.findclassic)
router.get('/betweennum', route.betweennum)
router.patch('/nicebread', route.nicebread)
router.get('/listABC', route.listABC)
router.get('/listall', route.listall)
router.get('/notinany', route.notinany)

export default router 