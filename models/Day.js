import mongoose from 'mongoose'


//building user model for user collection in mongodb
const DaySchema = new mongoose.Schema({
    ownerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    dailyTasks:[
        {
            text: {type:String, required:true, trim:true},
            isComplete: {type:Boolean,default:false}
        }
    ],
    completedTasks:{
        type: Number,
        default: 0
    },
    goalReached:{
        type: Boolean,
        default: false
    },
    effectiveDate :{
        type: Date,
        required:true
        
    },
    createdAt: { 
        type:Date,
        default: Date.now
    }
})

DaySchema.index({ownerID:1, effectiveDate:1})
export default mongoose.model('Day', DaySchema)