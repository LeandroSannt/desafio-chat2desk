import {IConstructorProps,IParamsModel, IResponse} from '../interfaces/root'
import {connection} from '../database'
import AppError from '../errors/AppErrors'
import { IUser } from '../interfaces/user'

class BaseModel{
  name_model:string | undefined
  constructor({name_model}:IConstructorProps){
    this.name_model = name_model
  }

  async findMany(){
    try{
      const data = await connection(this.name_model)
      return {
        data:data,
        status:200
      }
    }catch(err:any){
      return {status:err.statusCode,data:err.message}
    }
  }

  async findById(id:number){

    try{
      const data = await connection(this.name_model).where({id})


      if(data.length === 0) {
        throw new AppError("Não foi possivel encontrar o objeto",404);
      }

      return {
        data:data[0],
        status:200
      }

    }catch(err:any){
      return {status:err.statusCode,data:err.message}
    }
  }

  async create(payload:Object){

    try{
      const data = await connection(this.name_model).insert(payload).returning('*')

      return {
        data:data[0],
        status:200
      }

    }catch(err:any){
      console.log(err)
      return {status:err.statusCode,data:err.message}
    }
  }

  async update({id,payload}:IParamsModel):Promise<IResponse>{
    try{

      const hasData = await connection(this.name_model).where({id})

      if(hasData.length === 0) {
        throw new AppError("Não foi possivel encontrar o objeto",404);
      }
      
      const data = await connection<IUser>(this.name_model).where({id}).update(payload).returning('*')

      return {
        data:data[0],
        status:400
      }
    }catch(err:any){
      return {status:err.statusCode || 500,data:err.message}
    }
  }

  async delete(id:number){
    try{

      const hasData = await connection(this.name_model).where({id})

      if(hasData.length === 0) {
        throw new AppError("Não foi possivel encontrar o objeto",404);
      }

      await connection(this.name_model).where({id}).delete()

      return {
        data:'usuario excluido',
        status:200
      }

    }catch(err:any){
      return {status:err.statusCode,data:err.message}
    }
  }
}

export {BaseModel}