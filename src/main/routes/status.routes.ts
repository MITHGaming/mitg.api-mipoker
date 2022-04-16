import { Router } from 'express'

export default (router: Router): void => {
  router.post('/status', (req, res) => {
    res.status(200).send('OK')
  })

  router.post('/message', (req, res) => {
    res.status(200).send('ok')
  })
}
