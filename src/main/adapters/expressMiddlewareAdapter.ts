import { Middleware } from '@/presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware, property: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.cookies?.['next-auth.session-token'],
      ...(req.headers || {})
    }

    const httpResponse = await middleware.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req, { [property]: httpResponse.body })
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}
