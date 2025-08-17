//express app
import express from 'express'
const app = express()
//mongoDB module
import mongoose from 'mongoose'

//login verification
import passport from 'passport'

//session modules
import session from 'express-session'
import MongoStore from 'connect-mongo'

//able to put/delete with forms in ejs
import methodOverride from 'method-override'

//able to flash messages 
import flash from 'express-flash'

//logging requests in console easily
import logger from 'morgan'

//allows global use of .env variables
import dotenv from "dotenv";
dotenv.config({ path: 'config/.env' });

//routes
import homeRoutes from './routes/home.js'
import profileRoute from './routes/profile.js'
import todayRoute from './routes/today.js'
import tomorrowRoute from './routes/tomorrow.js'

//configuring passport
import configurePassport from './config/passport.js'
configurePassport(passport)

//connecting to our database
import connectDB from './config/database.js'
connectDB()


//using ejs for views
app.set('view engine','ejs')

//allows the use of all files in public without having to show where the file iwthin public is
app.use(express.static('public'))

//allows us to parse the data in request.body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//logs requests and responses to console
app.use(logger("dev"))

//allows us to put/delete in html forms
app.use(methodOverride('_method'))

//setting up sessions to be stored in mongodb
app.use(
    session({
        secret: 'orange monkey',
        resave : false,
        saveUninitialized : false,
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    })
)

//passport middlewear
app.use(passport.initialize())
app.use(passport.session())

//using flash messages
app.use(flash())

//sending to routes
app.use('/',homeRoutes)
app.use('/profile',profileRoute)
app.use('/today',todayRoute)
app.use('/tomorrow',tomorrowRoute)













app.listen(process.env.PORT, ()=>{
    console.log(`Your server is running on port: ${process.env.PORT}`)
})