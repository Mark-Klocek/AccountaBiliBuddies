import express from 'express'
const router = express.Router()
import homeController from '../controllers/home.js'
import authController from '../controllers/auth.js'
import profileController from '../controllers/profile.js'
import ensureFunctions from '../middleware/auth.js'
import tomorrowController from '../controllers/tomorrow.js'

router.get("/", ensureFunctions.ensureAuth, tomorrowController.getTomorrow);
router.post('/addTask',tomorrowController.addTask);
router.post('/deleteTask/',tomorrowController.deleteTask)

export default router