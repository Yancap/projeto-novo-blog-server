import { FastifyInstance } from "fastify"
import { articlesGet } from "../../controller/cms/articles/articles-get"
import { articlesGetforClient } from "../../controller/client/articles/articles-get-for-client"

export async function articlesRoutes(app: FastifyInstance) {
    app.get('/get-all',  () => { /* TODO */}) // Certo
    app.post('/get', articlesGetforClient) // Certo
}