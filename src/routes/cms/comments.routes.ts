import { FastifyInstance } from "fastify"
import { CommentsController } from "../../controller/cms/comments/comments-controller"
import { commentsGetArticlesComments } from "../../controller/cms/comments/handler-comments-get-articles-comments"
import { commentsManagerDelete } from "../../controller/cms/comments/handler-comments-manager-delete"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function commentsRoutes(app: FastifyInstance) {
    const commentsController = new CommentsController();
    app.get('/from-articles', commentsController.get) 
    app.delete('/manager-delete', {onRequest: [verifyJWT]},  commentsController.managerDelete) 

}