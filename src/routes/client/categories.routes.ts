import { FastifyInstance } from "fastify"
import { categoriesGetAll } from "../../controller/cms/categories/categories-get-all"

export async function categoriesRoutes(app: FastifyInstance) {
    app.get('/', categoriesGetAll) 

}