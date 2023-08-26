import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/authenticate"

export async function categoriesRoutes(app: FastifyInstance) {
    app.get('/', login) 

}