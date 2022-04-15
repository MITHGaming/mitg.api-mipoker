import app from '@/main/config/app'
import env from '@/environment'

app.listen(env.APP.PORT, () => {
  console.log('Server started on port 3333!')
})
