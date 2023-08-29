import { FastifyInstance } from "fastify"
import { commentsGetArticlesComments } from "../../controller/cms/comments/comments-get-articles-comments"

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/get-for-articles', commentsGetArticlesComments) 
}