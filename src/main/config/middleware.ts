import { Express } from 'express'
import {
  bodyParser,
  contentType,
  handleJson,
  cors,
  protections
} from '@/main/middleware'

export default (app: Express): void => {
  app.use(cors)
  app.use(protections)
  app.use(bodyParser)
  app.use(handleJson)
  app.use(contentType)
}
