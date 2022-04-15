import { Router } from 'express'
import { test } from '@/test/test'

export default (router: Router): void => {
  router.get('/status', (req, res) => {
    console.log(test())
    res.status(200).send('OK')
  })
}
