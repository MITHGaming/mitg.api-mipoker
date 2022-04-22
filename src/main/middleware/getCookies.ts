import { NextFunction, Request, Response } from 'express'

export const cookieParser = (req: Request, res: Response, next: NextFunction): void => {
  const cookies = req.headers.cookie
  if (cookies) {
    req.cookies = cookies.split(';').reduce((obj, c) => {
      const n = c.split('=')
      obj[n[0].trim()] = n[1].trim()
      return obj
    }, {})
  }
  next()
}
