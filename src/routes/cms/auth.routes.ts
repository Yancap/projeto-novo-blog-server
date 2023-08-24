import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/autenticate"
import { profile } from "../../controller/cms/profile"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function authRoutes(app: FastifyInstance) {
    app.post('/sessions', login)
    // Authentication JWT
    app.get('/profile', {onRequest: [verifyJWT]}, profile)

}