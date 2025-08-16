import express from 'express'
const app = express()


import homeRoutes from './routes/home.js'

import dotenv from "dotenv";
dotenv.config({ path: 'config/.env' });






app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//sending to routes

//home route
app.use('/',homeRoutes)













app.listen(process.env.PORT, ()=>{
    console.log(`Your server is running on port: ${process.env.PORT}`)
})