import { Server, Socket } from 'socket.io'

export const StatusController = (): any => {
  return async (
    socket: Socket,
    io: Server,
    props: IStatusController.Request
  ) => {
    io.emit('status', { status: 200, socketId: socket.id })
  }
}

export default StatusController

export namespace IStatusController {
  export type Request = {}
}
