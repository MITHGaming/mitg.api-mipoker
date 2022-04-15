import { readdirSync } from 'fs'
import path from 'path'
import { Server } from 'socket.io'

export default (io: Server): void => {
  readdirSync(path.join(__dirname, '..', 'sockets')).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../sockets/${file}`)).default(io)
    }
  })
}
