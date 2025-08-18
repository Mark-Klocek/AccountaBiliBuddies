import Task from '../models/Task.js'
import Day from '../models/Day.js'
import User from '../models/User.js'

class tomorrowController {

    async getTomorrow (req,res){
        try {
            //getting effective date
            let effectiveDate = new Date
            effectiveDate.setDate(effectiveDate.getDate()+1)
            effectiveDate.setHours(0,0,0,0)
            //getting daily tasks
            const tomorrowTasks = await Task.find({ownerID : req.user._id, effectiveDate : effectiveDate, visible:true})
            const dailyTasks = tomorrowTasks.map(task=>({
                text: task.taskText,
                isComplete: task.isComplete,
                taskID : task._id
                
            }))
            //getting userName
            let userInfo = await User.findOne(req.user._id)
            //setting tomorrow to the existing day, or creating a new Day
            let tomorrow = await Day.findOneAndUpdate(
                {ownerID : req.user._id, effectiveDate : effectiveDate},
                {
                    $set:{
                        ownerID : req.user._id,
                        dailyTasks : dailyTasks,
                        completedTasks:0,
                        goalReached:false,
                        effectiveDate,
                        createdAt: Date.now()
                        
                        
                    }
                },
                {upsert:true,new: true, setDefaultsOnInsert: true}
            );
                        
            res.render('tomorrow.ejs', {nextDay: tomorrow, userInfo});


        } catch (error) {
            console.log(error)
        }
        
        
        
    }
    async addTask(req,res){
        try {
            let effectiveDate = new Date
            effectiveDate.setDate(effectiveDate.getDate()+1)
            effectiveDate.setHours(0,0,0,0)
            
            await Task.create(
                {
                   ownerID : req.user._id,
                   taskText : req.body.taskText,
                   effectiveDate,
                   visible: true,
                   isComplete: false,
                   createdAt: Date.now() 
                }
            )
            
            res.redirect('/tomorrow');   
        } catch (error) {
            console.log(error)
        }
    }
    async deleteTask(req,res){
        console.log('test')
        try {
            
            console.log(req.body)
            let task = await Task.findOneAndUpdate({_id: req.body.taskID}, {$set: {visible: false}})
            console.log(task)
            res.redirect('/tomorrow');
            
        } catch (error) {
            console.log(error)
        } 
        
        
    }
    
}


  export default new tomorrowController();