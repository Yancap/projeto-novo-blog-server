import { FastifyInstance } from "fastify"
import { categoriesGetAll } from "../../controller/cms/categories/handler-categories-get-all"

export async function categoriesRoutes(app: FastifyInstance) {
    app.get('/', categoriesGetAll) 

}