import { httpSocketResponseData } from '../protocols'

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
