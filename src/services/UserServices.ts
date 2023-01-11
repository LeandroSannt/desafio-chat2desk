import {BaseModel} from '../models/baseModel'
import {UserModel} from '../models/userModels'
import { hash } from 'bcryptjs'
import { IUser } from '../interfaces/user'
import AppError from '../errors/AppErrors'


interface UserProps{
  name:string
  login:string
  password:string
  email:string
}

interface UserPropsGet{
  payload:UserProps
  id:number
}

class UserServices{

  Model:BaseModel

  constructor(){
    this.Model = new BaseModel({name_model:'users'})
  }

  async index(){
    const {data} = await this.Model.findMany()
    data.map((user:IUser) =>{delete user.password})

    return data

  }

  async store(payload:UserProps){

    const userModels = new UserModel()

    const {data} =  await userModels.findByEmail(payload.email)
  
    if(data){
      throw new AppError("Já existe um usuario cadastrado com esse email",403);
    }

    const hashePassword = await hash(payload.password,8)

    const user = await this.Model.create({
      ...payload,
      password:hashePassword
    })

    return user

  }

  async update({payload,id}:UserPropsGet){
    const user = await this.Model.update({payload,id})

    return user

  }

  async destroy(id:number){
    const user = await this.Model.delete(id)
    
    return user

  }

  async show(id:number){
    const user = await this.Model.findById(id)

    delete user.data.password

    return user
  }
}

export {UserServices}