import { Express } from 'express'
import {
  bodyParser,
  contentType,
  handleJson,
  corsInternal,
  protections,
  cookieParser
} from '@/main/middleware'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(corsInternal)
  app.use(cookieParser)
  app.use(protections)
  app.use(handleJson)
  app.use(contentType)
}
