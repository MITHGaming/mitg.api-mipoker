export type httpSocketResponseData = {
  statusCode: number
  body: any
}
export type httpSocketResponse = ({
  statusCode,
  body
}: httpSocketResponseData) => any
