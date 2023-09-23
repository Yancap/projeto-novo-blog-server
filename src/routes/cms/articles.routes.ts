import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { ArticlesController } from "../../controller/cms/articles/articles-controller"

export async function articlesRoutes(app: FastifyInstance) {
    const articlesController = new ArticlesController()

    app.get('/', {onRequest: [verifyJWT]}, articlesController.show) // Certo
    app.get('/get', articlesController.get) // Certo
    app.post('/', {onRequest: [verifyJWT]}, articlesController.create) // Certo
    app.put('/', {onRequest: [verifyJWT]}, articlesController.update) // Certo
    app.patch('/', {onRequest: [verifyJWT]}, articlesController.drafts) // att a rota
    app.patch('/:id', {onRequest: [verifyJWT]}, articlesController.draftsWithArticleId) // att a rota
    app.patch('/deactive/:id', {onRequest: [verifyJWT]}, articlesController.deactive) // Certo
    app.patch('/active/:id', {onRequest: [verifyJWT]}, articlesController.active) // Certo
    app.delete('/:id', {onRequest: [verifyJWT]}, articlesController.delete) // Certo
    
}