import { readdirSync } from 'fs'
import path from 'path'
import { Socket, Server } from 'socket.io'

export default (socket: Socket, io: Server): void => {
  readdirSync(path.join(__dirname, '..', 'sockets')).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../sockets/${file}`)).default(socket, io)
    }
  })
}
