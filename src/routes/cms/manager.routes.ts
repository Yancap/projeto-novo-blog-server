import { FastifyInstance } from "fastify"
import { verifyJWT } from '../../middlewares/verify-jwt'


export async function managerRoutes(app: FastifyInstance) {
  app.put('/avatar', {onRequest: [verifyJWT]}, () => {}) //TODO
}