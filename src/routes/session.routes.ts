import Router from 'express'

import {SessionController} from '../controllers/SessionController.ts'

const SessionRouter = Router()

const followersController = new SessionController()

SessionRouter.post('/login',followersController.login)

export {SessionRouter}