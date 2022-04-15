import dotenv from 'dotenv'
dotenv.config()

export default {
  APP: {
    PORT: process.env.PORT || 3333,
  },
}
