import app from './app'
import http from 'http'
import { Server } from 'socket.io'
import setupSockets from './sockets'

export const server = http.createServer(app)
const io = new Server(server)

setupSockets(io)
