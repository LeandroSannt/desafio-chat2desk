import {BaseModel} from './baseModel'
import {connection} from '../database'
import AppError from '../errors/AppErrors'


class UserModel{

  async findByEmail(email:string){

    try{
      const data = await connection('users').where({email})

      return {
        data:data[0],
        status:400
      }

    }catch(err:any){
      return {status:err.statusCode,data:err.message}
    }
  }

}

export {UserModel}