import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/autenticate"

export async function authRoutes(app: FastifyInstance) {
    app.post('/sessions', login)
}