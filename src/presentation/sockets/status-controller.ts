import { Server, Socket } from 'socket.io'
import { httpSocketResponse } from '@/presentation/protocols/'
import Joi from 'joi'
import { badRequestSocket, noContentSocket } from '../helper'

export const StatusController = (): any => {
  return async (
    socket: Socket,
    io: Server,
    payload: IStatusController.Request,
    callback: httpSocketResponse
  ) => {
    const { error } = StatusSchema.validate(payload)

    if (error) {
      return callback(badRequestSocket(error.message))
    }

    return callback(noContentSocket())
  }
}

export default StatusController

export namespace IStatusController {
  export type Request = {
    status: string
  }
}

const StatusSchema = Joi.object({
  status: Joi.string().required()
})
