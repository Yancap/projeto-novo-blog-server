import { FastifyInstance } from "fastify"
import { articlesGetforClient } from "../../controller/client/articles/articles-get-for-client"
import { articlesGetbyCategory } from "../../controller/client/articles/articles-get-by-category"
import { articlesGetAllForClient } from "../../controller/client/articles/articles-get-all-for-client"

export async function articlesRoutes(app: FastifyInstance) {
    app.get('/get-all',  articlesGetAllForClient) // Certo
    app.post('/get', articlesGetforClient) // Certo
    app.post('/get-by-category', articlesGetbyCategory) // Certo

}