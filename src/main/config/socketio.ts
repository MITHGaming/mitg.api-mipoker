import app from './app'
import http from 'http'
import { Server, Socket } from 'socket.io'
import setupSockets from './sockets'
import { instrument } from '@socket.io/admin-ui'

export const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
})

instrument(io, {
  auth: {
    type: 'basic',
    username: 'admin',
    password: '$2a$12$F4GpsijitAFjqQlNJda83u/aj83r1rnjC.cOMjMCoKw.0jd2x6RTy'
  }
})

io.on('connection', (socket: Socket) => {
  setupSockets(socket, io)
})
