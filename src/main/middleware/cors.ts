import cors from 'cors'

const whiteList = ['http://localhost:3000']

export const corsInternal = cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true,
  exposedHeaders: ['Authorization']
})
