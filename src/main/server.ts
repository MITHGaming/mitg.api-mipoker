import env from '@/environment'
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

Prisma.$connect().then(async () => {
  const app = (await import('../main/config/app')).default
  const { io, server } = await import('../main/config/socketio')

  app.set('socketio', io)
  app.set('server', server)

  server.listen(env.APP.PORT, () => {
    console.log(`Server running at http://localhost:${env.APP.PORT}`)
    console.log(`Server is running with ENV_PRODUCTION: ${env.APP.PRODUCTION}`)
  })
})
