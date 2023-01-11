import authconfig from '../config/auth'
import AppError from '../errors/AppErrors'

import {sign} from 'jsonwebtoken'
import {compare} from 'bcryptjs'
import {UserModel} from '../models/userModels'
import {IUser} from '../interfaces/user'

interface Request{
  email: string
  password: string
}

interface Response {
  user:IUser
  token:string
}

class AuthenticationService{
  public async execute({email,password}:Request):Promise<Response>{

    const userModel = new UserModel()
    const {data} = await userModel.findByEmail(email)

    if(!data){
      throw new AppError("Email ou senha invalidos",404)
    }

    const passwordmatcher = await compare(password,data.password)

    if(!passwordmatcher){
      throw new AppError('Email ou senha Invalidos')
    }

    const token = sign({},authconfig.jwt.secret,{
      subject:data.id.toString(),
      expiresIn:authconfig.jwt.expiresIn
    })

    return {
      user:data,
      token
    }
  }
}

export  {AuthenticationService}