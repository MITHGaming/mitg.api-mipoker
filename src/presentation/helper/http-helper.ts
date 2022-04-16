import { httpSocketResponseData } from '../protocols'

export const noContentSocket = (): httpSocketResponseData => ({
  body: null,
  statusCode: 204
})

export const badRequestSocket = (message: string): httpSocketResponseData => ({
  statusCode: 400,
  body: {
    message
  }
})
