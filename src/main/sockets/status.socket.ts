import { Server, Socket } from 'socket.io'

export default (socket: Socket, io: Server): void => {
  socket.on('disconnect', (user) => {
    console.log('user disconnected')
  })
}
