import { AuthMiddleware } from '@/presentation/middlewares/auth'
import { Router } from 'express'
import { adaptMiddleware } from '../adapters'

export default (router: Router): void => {
  router.post(
    '/cookie/test',
    adaptMiddleware(new AuthMiddleware({ id: 1 }), 'auth'),
    async (req, res) => {
      console.log(req.auth)
      res.send('ok')
    }
  )
}
