import Prisma from '@/infra/db/prisma'
import { Router } from 'express'
import { adaptRouter } from '../adapters'
import type { Prisma as PrismaPkg } from '@prisma/client'
import {
  CreateUserController,
  GetUserByIdController,
  GetUserByEmailController,
  GetUserByAccountController,
  UpdateUserController,
  DeleteUserController,
  CreateAccountController,
  GetSessionAndUserController,
  DeleteAccountController,
  CreateSessionController,
  UpdateSessionController,
  DeleteSessionController
} from '@/presentation/controllers/next'

const createUserController = new CreateUserController()
const getUserByIdController = new GetUserByIdController()
const getUserByEmailController = new GetUserByEmailController()
const getUserByAccountController = new GetUserByAccountController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()
const createAccountController = new CreateAccountController()
const deleteAccountController = new DeleteAccountController()
const getSessionAndUserByToken = new GetSessionAndUserController()
const createSessionController = new CreateSessionController()
const updateSessionController = new UpdateSessionController()
const deleteSessionController = new DeleteSessionController()

export default (router: Router): void => {
  router.post('/user/create', adaptRouter(createUserController, ['body']))
  router.get('/user/:id?', adaptRouter(getUserByIdController, ['params']))
  router.get('/user/email/:email?', adaptRouter(getUserByEmailController, ['params']))
  router.post('/user/account', adaptRouter(getUserByAccountController, ['body']))
  router.put('/user/:id?', adaptRouter(updateUserController, ['body']))
  router.delete('/user/:id?', adaptRouter(deleteUserController, ['params']))
  router.post('/account/link', adaptRouter(createAccountController, ['body']))
  router.delete(
    '/account/:provider?/:providerAccountId',
    adaptRouter(deleteAccountController, ['params'])
  )
  router.get('/session/:sessionToken?', adaptRouter(getSessionAndUserByToken, ['params']))
  router.post('/session/create', adaptRouter(createSessionController, ['body']))
  router.put('/session/:sessionToken?', adaptRouter(updateSessionController, ['body']))
  router.delete('/session/:sessionToken?', adaptRouter(deleteSessionController, ['params']))

  router.post('/verification/create', async (req, res) => {
    const { token, identifier, expires } = req.body

    const verification = await Prisma.verificationToken.create({
      data: {
        token,
        identifier,
        expires
      }
    })

    res.status(200).send({ ...verification })
  })

  router.post('/verification/use', async (req, res) => {
    const { token } = req.body

    try {
      const verification = await Prisma.verificationToken.delete({
        where: { identifier_token: token }
      })

      return res.status(200).send({ ...verification })
    } catch (error) {
      if ((error as PrismaPkg.PrismaClientKnownRequestError).code === 'P2025')
        return res.status(200).send(null)

      throw error
    }
  })
}
