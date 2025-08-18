import mongoose from 'mongoose'
import Day from '../models/Day.js'
import tomorrowController from '../controllers/tomorrow.js'
import User from '../models/User.js'
import {dayKeyLocal} from '../utils/date.js'


class todayController {

   async getToday (req,res){
        try {
            const effectiveDate = dayKeyLocal()
            const user = await User.findById(req.user._id)
            const today = await Day.findOne({ownerID : req.user._id, effectiveDate}).lean()

            // console.log(user)
            console.log(user)
            
            res.render('today.ejs',{user,today});
        } catch (error) {
            console.log(error)
        }
    }
    async updateTask (req,res){
        try {
            const today = await Day.findOneAndUpdate(
                                        { _id: req.body.dayId, "dailyTasks._id": req.body.taskId },
                                        { 
                                            $set: { "dailyTasks.$.isComplete": true },
                                            $inc: {completedTasks: 1} 
                                        },
                                        
                                        { new: true }
                                        )
            if(today.completedTasks == today.dailyTasks.length){
                const u = await User.findByIdAndUpdate(
                    {
                        _id:req.user._id
                    },
                    {
                        $inc:{currentStreak: 1}
                    },
                    {new:true})
                if (u && u.currentStreak > u.highestStreak){
                    await User.findByIdAndUpdate(
                        {
                            _id:req.user._id
                        },
                        {
                            $set:{highestStreak: u.currentStreak}
                        },
                        {new:true}
                    )
                }
            }
            res.redirect('/today')
        } catch (error) {
            console.log(error)
        }
    }
    
}


  export default new todayController();