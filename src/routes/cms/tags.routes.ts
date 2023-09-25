import { FastifyInstance } from "fastify"
import { tagsGetByArticleId } from "../../controller/cms/tags/tags-get-by-article-id"

export async function tagsRoutes(app: FastifyInstance) {
    app.get('/:article_id', tagsGetByArticleId) 

}