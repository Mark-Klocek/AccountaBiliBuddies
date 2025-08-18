import mongoose from 'mongoose'
import Day from '../models/Day.js'
import tomorrowController from '../controllers/tomorrow.js'
import User from '../models/User.js'
import {dayKeyLocal} from '../utils/date.js'


class todayController {

   async getToday (req,res){
        try {
            let effectiveDate = dayKeyLocal()
            let user = await User.findById(req.user._id)
            const today = await Day.findOne({ownerID : req.user._id, effectiveDate}).lean()
            console.log(user)
            res.render('today.ejs');
        } catch (error) {
            console.log(error)
        }
    }
    
}


  export default new todayController();