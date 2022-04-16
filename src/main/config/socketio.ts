import app from './app'
import http from 'http'
import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import setupSockets from './sockets'
import env from '@/environment'

export const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io', '*'],
    credentials: true
  }
})

instrument(io, {
  auth: {
    type: 'basic',
    username: env.SOCKET.USER,
    password: env.SOCKET.PASS
  }
})

io.on('connection', (socket) => {
  setupSockets(socket, io, 'connection')
})
