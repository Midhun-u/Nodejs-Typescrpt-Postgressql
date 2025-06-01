import { Router } from "express"
import {addUserController, deleteUserController, getUsersController, updateUserController } from '../controllers/userController'

const userRouter = Router()

//route for get all users
userRouter.get("/get-users" , getUsersController)

//route for add user
userRouter.post("/add-user" , addUserController)

//route for update user
userRouter.put("/update-user/:userId" , updateUserController)

//route for delete user
userRouter.delete("/delete-user/:userId" , deleteUserController)

export {userRouter}