import { readdirSync } from 'fs'
import path from 'path'
import { Socket, Server } from 'socket.io'

export default (socket: Socket, io: Server, namespace?: string): void => {
  readdirSync(path.join(__dirname, '..', 'sockets', `${namespace}`)).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../sockets/${namespace}/${file}`)).default(socket, io)
    }
  })
}
