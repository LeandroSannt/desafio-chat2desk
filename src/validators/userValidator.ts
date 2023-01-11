import { Request, Response, NextFunction } from "express";
import {body,validationResult} from 'express-validator';

export const userValidatorSchema =[
  body('name').isString().notEmpty().withMessage("Nome obrigatorio"),
  body('password').isString().notEmpty().withMessage("Senha obrigatoria"),
  body('login').isString().notEmpty().withMessage("Login obrigatorio"),
  body('email').isEmail().notEmpty().unescape().withMessage("Email obrigatorio")
]
export async function userValidator(  
  request: Request,
  response: Response,
  next: NextFunction
) {

  const errors = validationResult(request)

  if(!errors.isEmpty()){
    return response.status(400).json({ errors: errors.array() });
  }

  return next();

}