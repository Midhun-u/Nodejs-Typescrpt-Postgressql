import { Request, Response } from 'express'
import { query } from '../../utility/query'
import { Json } from '../../types/json'


//controller for get all users
export const getUsersController = async (request: Request, response: Response) => {

    try {

        const userRows = await query('SELECT * FROM users')

        if (userRows.rows.length > 0) {

            const jsonData: Json = {
                success: true,
                users: userRows.rows,
                totalCount: userRows.rowCount,
            }

            response.status(200).json(jsonData)

        } else {

            const jsonData: Json = {
                success: false,
                message: "No users found",
                totalCount: userRows.rowCount
            }

            response.status(404).json(jsonData)
        }


    } catch (error) {

        const jsonData: Json = {
            success: false,
            error: "server error"
        }

        response.status(500).json(jsonData)
        console.log(`getAllUsersController error :  ${error}`)
    }

}

//controller for add user
export const addUserController = async (request: Request, response: Response): Promise<any> => {

    try {

        const emptyDataSet = {
            name: "",
            email: "",
            age: null,
            place: ""
        }

        const { name, email, age, place } = request.body || emptyDataSet

        if (name && email && age && place) {

            //check age is number
            if (isNaN(age)) {

                const jsonData: Json = {
                    success: false,
                    message: "age must be number"
                }

                return response.status(400).json(jsonData)
            }

            //check email already exits
            const checkEmail = await (await query("SELECT email FROM users WHERE email = $1", [email])).rows[0]

            if (checkEmail) {

                const jsonData: Json = {
                    success: false,
                    message: "Email already exits"
                }

                response.status(400).json(jsonData)

            } else {

                await query("INSERT INTO users (name , email , age , place , created_at) VALUES ($1 , $2 , $3 , $4 , $5);", [name, email, age, place, new Date()])

                const jsonData: Json = {
                    success: true,
                    message: "Data inserted"
                }

                response.status(201).json(jsonData)

            }

        } else {

            const jsonData: Json = {
                success: false,
                message: `name , email , age and place are required`
            }

            response.status(400).json(jsonData)
        }

    } catch (error) {

        const jsonData: Json = {
            success: false,
            error: "server error"
        }

        response.status(500).json(jsonData)
        console.log(`addUserController error :  ${error}`)

    }

}

//controller for update user
export const updateUserController = async (request: Request, response: Response): Promise<any> => {

    try {

        const { userId } = request.params || ""
        const {name , email} = request.body || {name : "" , email : ""}

        if (userId && name || email) {

            const field : string = name ? "name" : "email" // field for which field updated
            const fieldValue : string = name ? name : email // for updating value

            await query(`UPDATE users SET ${field} = $1 WHERE id = $2;` , [fieldValue, userId])

            const jsonData : Json = {
                success : true,
                message : "User updated",
            }

            response.status(200).json(jsonData)

        } else {

            const jsonData: Json = {
                success: false,
                error: "email or name provided"
            }

            response.status(400).json(jsonData)
        }

    } catch (error) {

        const jsonData: Json = {
            success: false,
            error: "server error"
        }

        response.status(500).json(jsonData)

        console.log(`updateUserController error : ${error}`)
    }

} 

//controller for delete user
export const deleteUserController = async (request : Request , response : Response) : Promise<any> => {

    try {

        const {userId} = request.params || ""

        if(userId){

            await query("DELETE FROM users WHERE id = $1" , [userId])

            const jsonData : Json = {
                success : true,
                message : "User deleted"
            }

            response.status(200).json(jsonData)

        }
        
    } catch (error) {

         const jsonData: Json = {
            success: false,
            error: "server error"
        }

        response.status(500).json(jsonData)

        console.log(`deleteUserController error : ${error}`)
    }

}