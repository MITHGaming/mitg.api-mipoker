import { GetUserByEmailController } from '@/presentation/controllers/GetUserByEmail'
import { Router } from 'express'
import { adaptRouter } from '../adapters'

const getUserByEmailController = new GetUserByEmailController()

export default (router: Router): void => {
  router.get('/user/email', adaptRouter(getUserByEmailController, ['body']))
}
