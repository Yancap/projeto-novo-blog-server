import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/authenticate"
import { profile } from "../../controller/cms/auth/profile"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function authRoutes(app: FastifyInstance) {
    app.post('/sessions', login) // certo
    // Authentication JWT
    //app.get('/profile', {onRequest: [verifyJWT]}, profile)

}