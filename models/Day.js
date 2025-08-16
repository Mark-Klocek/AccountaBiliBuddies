import mongoose from 'mongoose'


//building user model for user collection in mongodb
const DaySchema = new mongoose.Schema({
    ownerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dailyTasks:{
      type: Array,
      required: true  
    },
    totalTasks:{
        type: Number,
        required: true
        
    },
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

export default mongoose.model('Day', DaySchema)