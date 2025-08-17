import express from 'express'
const router = express.Router()
import homeController from '../controllers/home.js'
import authController from '../controllers/auth.js'
import profileController from '../controllers/profile.js'
import ensureFunctions from '../middleware/auth.js'
import todayController from '../controllers/today.js'

router.get("/", ensureFunctions.ensureAuth, todayController.getToday);

export default router