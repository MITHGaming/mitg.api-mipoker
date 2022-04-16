import { Server, Socket } from 'socket.io'

export const adaptSocketEvent = (
  nameEvent: string,
  socket: Socket,
  io: Server,
  socketController: any
): any => {
  return async (data: any, callback: () => any) => {
    if (typeof callback !== 'function') {
      socket.emit('error', {
        statusCode: 400,
        event: nameEvent,
        error: { message: 'Callback is not a function' }
      })
      return
    }

    await socketController()(socket, io, data, callback)
  }
}

export default adaptSocketEvent
