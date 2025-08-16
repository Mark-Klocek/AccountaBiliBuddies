import express from 'express'
const router = express.Router()
import homeController from '../controllers/home.js'


router.get('/',homeController.getIndex)


export default router