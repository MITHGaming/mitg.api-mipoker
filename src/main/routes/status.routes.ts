import { Router } from 'express'

export default (router: Router): void => {
  router.get('/status', (req, res) => {
    res.status(200).send('OK')
  })
}
