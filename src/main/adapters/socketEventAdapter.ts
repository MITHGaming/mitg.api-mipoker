import { Server, Socket } from 'socket.io'

export const adaptSocketEvent = (
  socket: Socket,
  io: Server,
  socketController: any
): any => {
  return async (data: any) => {
    await socketController()(socket, io, data)
  }
}

export default adaptSocketEvent
