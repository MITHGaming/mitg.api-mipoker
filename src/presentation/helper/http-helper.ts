import { ServerError } from '../errors/ServerError'
import { HttpResponse, httpSocketResponseData } from '../protocols'

export const noContentSocket = (): httpSocketResponseData => ({
  body: null,
  statusCode: 204
})

export const ok = (data: any): httpSocketResponseData => ({
  body: data,
  statusCode: 200
})

export const badRequestSocket = (message: string): httpSocketResponseData => ({
  statusCode: 400,
  body: {
    message
  }
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
