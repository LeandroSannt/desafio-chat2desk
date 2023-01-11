import { Request, Response } from "express";
import {AuthenticationService} from '../services/AuthenticatedService'

class SessionController {

  async login(request: Request, response: Response){
    const {email,password} = request.body

      const authenticateUser = new AuthenticationService()

      const {user, token} = await authenticateUser.execute({
        email,
        password
      })

      delete user.password

      return response.json({user,token})
  }
}

export {SessionController}