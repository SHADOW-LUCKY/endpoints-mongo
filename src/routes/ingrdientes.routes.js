import {Router} from 'express'
import {lessthan, multiply, delifzero, maxprice, panplus, findclassic,betweennum,nicebread} from '../controllers/ingrdientes.controllers.js'

const router = Router()

router.get('/lessthan', lessthan)
router.get('/multiply', multiply)
router.delete('/delifzero',delifzero)
router.get('/maxprice', maxprice)
router.patch('/panplus', panplus)
router.get('/findclassic', findclassic)
router.get('/betweennum', betweennum)
router.patch('/nicebread', nicebread)

export default router