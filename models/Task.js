import mongoose from 'mongoose'


//building user model for user collection in mongodb
const TaskSchema = new mongoose.Schema({
    ownerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    taskText :{
        type: String,
        required: true
    },
    effectiveDate :{
        type: Date,
        required:true
        
    },
    dateCreated :{
        type:Date,
        required:true
    },
    visible:{
        type: Boolean,
        default: true
    },
    createdAt: { 
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Task', TaskSchema)