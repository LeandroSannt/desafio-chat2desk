import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import {UserServices} from '../services/UserServices'

class UserController{

  async index(request:Request,response:Response){
    const userServices = new UserServices()
    const users = await userServices.index()

    return response.json(users)
  }

  async store(request:Request,response:Response){
    const userServices = new UserServices()



    const {login,name,password,email} = request.body

    const user = await userServices.store({login,name,password,email})

    return response.json(user)

  }

  async update(request:Request,response:Response ){
    const userServices = new UserServices()

    const {login,name,password,email} = request.body
    const {id} = request.params

    const user = await userServices.update({payload:{login,name,password,email},id:id as unknown as number})
    return response.status(user.status).json(user)

  }

  async destroy(request:Request,response:Response){
    const userServices = new UserServices()

    const {id} = request.params

    const user = await userServices.destroy(id as unknown as number)
    return response.status(user.status).json(user)
  }

  async show(request:Request,response:Response){
    const userServices = new UserServices()

    const {id} = request.params
    const user = await userServices.show(id as unknown as number)

    return response.status(user.status).json(user.data)

  }

}

export {UserController}