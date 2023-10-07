import { FastifyInstance } from "fastify"
import { managementChangeAvatar } from '../../controller/cms/management/management-changed-avatar'
import { verifyJWT } from '../../middlewares/verify-jwt'


export async function managerRoutes(app: FastifyInstance) {
  app.put('/avatar', {onRequest: [verifyJWT]}, managementChangeAvatar) //TODO
}