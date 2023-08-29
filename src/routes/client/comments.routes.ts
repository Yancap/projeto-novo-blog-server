import { FastifyInstance } from "fastify"
import { commentsCreate } from "../../controller/client/comments/comments-create"
import { verifyUserJWT } from "../../middlewares/verify-user-jwt"

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyUserJWT]}, commentsCreate)     
}