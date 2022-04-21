import {
  GetUserByEmailController,
  GetUserByIdController,
  CreateUserController,
  LoginController
} from '@/presentation/controllers/user'
import { Router } from 'express'
import { adaptRouter } from '../adapters'

const getUserByEmailController = new GetUserByEmailController()
const getUserByIdController = new GetUserByIdController()
const createUserController = new CreateUserController()
const loginController = new LoginController()

export default (router: Router): void => {
  router.get('/user/email', adaptRouter(getUserByEmailController, ['body']))
  router.get('/user/id', adaptRouter(getUserByIdController, ['body']))
  router.post('/user/create', adaptRouter(createUserController, ['body']))
  router.post('/user/login', adaptRouter(loginController, ['body']))
}
