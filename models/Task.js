import mongoose from 'mongoose'


//building user model for user collection in mongodb
const TaskSchema = new mongoose.Schema({
    ownerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    taskText :{
        type: String,
        required: true,
        trim:true,
        minLength: 3,
        maxLength: 25
    },
    effectiveDate :{
        type: Date,
        required:true
        
    },
    visible:{
        type: Boolean,
        default: true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    createdAt: { 
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Task', TaskSchema)