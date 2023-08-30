import { FastifyInstance } from "fastify"
import { creditsGetByArticleId } from "../../controller/cms/credits/credits-get-by-article-id"

export async function creditsRoutes(app: FastifyInstance) {
    app.post('/', creditsGetByArticleId) 

}