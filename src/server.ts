import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/db'
import { userRouter } from './routes/userRoute'

//variables
const port : number = 5000
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//route middlewares
app.use("/api/" , userRouter)


app.listen(port , () => {

    //function for connect database
    connectDB()

    console.log(`SERVER RUNNING ON ${port}`)
})