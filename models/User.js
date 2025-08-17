import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

//building user model for user collection in mongodb
const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique: true
    },
    email :{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    currentStreak:{
        type: Number,
        default: 0
    },
    highestStreak:{
        type: Number,
        default: 0
    }
})

//verifying that the users password is correct, then salting the password
UserSchema.pre('save', function save(next){
    const user = this;
    if (!user.isModified("password")){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if (err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if (err){
                return next(err);
            }
            user.password = hash;
            next()
        })
    })
})

//validating password vs salted password upon user login

UserSchema.methods.comparePassword = function comparePassword(candidatePassword){
   return bcrypt.compare(candidatePassword, this.password);
}

//exporting the schema ESM style
export default mongoose.model('User', UserSchema)
