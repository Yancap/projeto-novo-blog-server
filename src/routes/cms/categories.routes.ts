import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/authenticate"
import { categoriesGetAll } from "../../controller/cms/categories/handler-categories-get-all"

export async function categoriesRoutes(app: FastifyInstance) {
    app.get('/', categoriesGetAll) 

}