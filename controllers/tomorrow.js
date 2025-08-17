import Task from '../models/Task.js'
import Day from '../models/Day.js'

class tomorrowController {

    async getTomorrow (req,res){
        try {
            //getting effective date
            let effectiveDate = new Date
            effectiveDate.setDate(effectiveDate.getDate()+1)
            effectiveDate.setHours(0,0,0,0)
            //getting daily tasks
            const tomorrowTasks = await Task.find({ownerID : req.user._id, effectiveDate : effectiveDate})
            const dailyTasks = tomorrowTasks.map(task=>({
                text: task.taskText,
                isComplete: task.isComplete
            }))
            //setting tomorrow to the existing day, or creating a new Day
            let tomorrow = await Day.findOneAndUpdate(
                {ownerID : req.user._id, effectiveDate : effectiveDate},
                {
                    $setOnInsert:{
                        ownerID : req.user._id,
                        dailyTasks,
                        effectiveDate,
                        completedTasks:0,
                        goalReached:false,
                    }
                },
                {upsert:true,new: true, setDefaultsOnInsert: true}
            );            
            res.render('tomorrow.ejs');


        } catch (error) {
            console.log(error)
        }
        //const tomorrow = await Day.find( {ownerID : req.user._id, effectiveDate : }) 
        
    }
    
}


  export default new tomorrowController();