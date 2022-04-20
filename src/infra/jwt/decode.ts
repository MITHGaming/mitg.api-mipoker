import jwt from 'jsonwebtoken'

export const decode = async (token: string): Promise<any> => {
  const response = await jwt.decode(token, { complete: true })

  return response
}
