import { FastifyInstance } from "fastify"
import { creditsGetByArticleId } from "../../controller/cms/credits/credits-get-by-article-id"

export async function creditsRoutes(app: FastifyInstance) {
    app.get('/:article_id', creditsGetByArticleId) 

}