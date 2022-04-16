import { Server, Socket } from 'socket.io'
import { adaptSocketEvent } from '@/main/adapters'
import { StatusController } from '@/presentation/sockets'

export default (socket: Socket, io: Server): void => {
  socket.on('status', adaptSocketEvent(socket, io, StatusController))
}
