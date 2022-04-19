export type httpSocketResponseData = {
  statusCode: number
  body: any
}
export type httpSocketResponse = ({ statusCode, body }: httpSocketResponseData) => any

export type HttpResponse = {
  statusCode: number
  body: any
}
