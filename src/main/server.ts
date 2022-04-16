import { io, server } from '@/main/config/socketio'
import app from '@/main/config/app'
import env from '@/environment'

app.set('socketio', io)
app.set('server', server)

server.listen(env.APP.PORT, () => {
  console.log(`Server running at http://localhost:${env.APP.PORT}`)
  console.log(`Server is running with ENV_PRODUCTION: ${env.APP.PRODUCTION}`)
})
