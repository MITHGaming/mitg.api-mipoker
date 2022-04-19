import { Controller } from '@/presentation/protocols/controller'
import { Request, Response } from 'express'

export const adaptRouter = (
  controller: Controller,
  reqType: Array<'body' | 'params' | 'query'>
) => {
  return async (req: Request, res: Response) => {
    let request = {}

    reqType.forEach((type) => {
      request = { ...request, ...(req[type] || {}) }
    })

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}

export default adaptRouter
