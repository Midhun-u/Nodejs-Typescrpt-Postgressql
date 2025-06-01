import {Pool} from 'pg'
import 'dotenv/config'

//config postgres database
export const pool = new Pool({
    user : process.env.DB_USER_NAME,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT),
})

//function for connect postgressql database
export const connectDB = async () => {

    try{
    
        await pool.connect()
        console.log(`DATABASE CONNECTED`)
    
    }catch(error){
        console.log(`DATABASE IS NOT CONNECTED error : ${error}`)
    }

}