import { Request, Response, NextFunction } from 'express'

export const handleJson = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // @ts-expect-error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // @ts-expect-error
    return res.status(400).send({ status: 400, message: err.message })
  }

  next()
}
