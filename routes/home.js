import express from 'express'
const router = express.Router()
import homeController from '../controllers/home.js'
import authController from '../controllers/auth.js'


router.get('/',homeController.getIndex)
router.get('/login',authController.getLogin)
router.get('/register',homeController.getRegister)
router.post("/register", authController.postRegister);
router.post('/login',authController.postLogin)


export default router