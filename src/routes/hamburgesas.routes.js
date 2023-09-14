import {Router} from 'express'
import * as route from '../controllers/hamburgesas.controllers.js'

const router = Router()

router.get('/allvegan', route.allvegan)
router.get('/allchefb', route.allchefb)
router.patch('/addclassic', route.addclassic)
router.get('/findintegral', route.findintegral)
router.get('/notchesse', route.notchesse)
router.get('/lessnine', route.lessnine)
router.delete('/lessfive', route.lessfive)
router.get('/ascentham', route.ascentham)
router.get('/findtomatoandonion', route.findtomatoandonion)
router.get('/gourmetbytwo', route.gourmetbytwo)
router.post('/pepinillos', route.pepinillos)
router.get('/sevening', route.sevening)
router.get('/gourmetchef', route.gourmetchef)


export default router