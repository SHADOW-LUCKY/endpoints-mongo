import {Router} from 'express'
import {allvegan, allchefb, addclassic, findintegral,notchesse,lessnine, lessfive,ascentham,findtomatoandonion} from '../controllers/hamburgesas.controllers.js'

const router = Router()

router.get('/allvegan', allvegan)
router.get('/allchefb', allchefb)
router.patch('/addclassic', addclassic)
router.get('/findintegral', findintegral)
router.get('/notchesse', notchesse)
router.get('/lessnine', lessnine)
router.delete('/lessfive', lessfive)
router.get('/ascentham', ascentham)
router.get('/findtomatoandonion', findtomatoandonion)


export default router