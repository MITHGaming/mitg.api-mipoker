import dotenv from 'dotenv'
dotenv.config()

export default {
  APP: {
    PORT: process.env.PORT || 3000,
    PORTIO: process.env.PORTIO || 3001,
    PRODUCTION: process.env.PRODUCTION ?? 'false'
  },
  SOCKET: {
    USER: process.env.SOCKET_USER || 'admin',
    PASS: process.env.SOCKET_PASS || ''
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'admin'
  }
}
