import { pool } from "../src/config/db"

//function for work with query
export const query = (query : string , params ? : any[]) => {

    return pool.query(query , params)

}