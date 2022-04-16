import { Request, Response } from 'express'
import { Server, Socket } from 'socket.io'

export const adaptRouter = (socket: Socket, io: Server) => {
  return async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World' })
  }
}

export default adaptRouter
