import {Router} from 'express'
import {userRouter} from './user.routes'
import {SessionRouter} from './session.routes'

const routes = Router()

routes.use('/users',userRouter)
routes.use('/session',SessionRouter)

export default routes;