import Router from 'express'

import { UserController } from '../controllers/UserController'
import { userValidator,userValidatorSchema } from '../validators/userValidator'
import { ensuredAuthentication } from '../middlewares/hasAuthenticated'

const userRouter = Router()

const followersController = new UserController()

userRouter.post('/',userValidatorSchema,userValidator,followersController.store)
userRouter.get('/',ensuredAuthentication,followersController.index)
userRouter.get('/:id',ensuredAuthentication,followersController.show)
userRouter.delete('/:id',ensuredAuthentication,followersController.destroy)
userRouter.put('/:id',ensuredAuthentication,userValidatorSchema,userValidator,userValidator,followersController.update)

export {userRouter}