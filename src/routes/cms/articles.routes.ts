import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/handler-admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/handler-admin-register"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { articlesCreate } from "../../controller/cms/articles/articles-create"
import { articlesDrafts } from "../../controller/cms/articles/articles-drafts"
import { articlesDeactive } from "../../controller/cms/articles/articles-deactive"
import { articlesUpdate } from "../../controller/cms/articles/articles-update"
import { articlesDelete } from "../../controller/cms/articles/articles-delete"
import { articlesGet } from "../../controller/cms/articles/articles-get"
import { articlesShowByManagerId } from "../../controller/cms/articles/articles-show-by-manager-id"
import { articlesActive } from "../../controller/cms/articles/articles-active"
import { ArticlesController } from "../../controller/cms/articles/articles-controller"

export async function articlesRoutes(app: FastifyInstance) {
    const articlesController = new ArticlesController()

    app.get('/', {onRequest: [verifyJWT]}, articlesController.show) // Certo
    app.post('/get', articlesController.get) // Certo
    app.post('/', {onRequest: [verifyJWT]}, articlesController.create) // Certo
    app.put('/', {onRequest: [verifyJWT]}, articlesController.update) // Certo
    app.patch('/', {onRequest: [verifyJWT]}, articlesController.drafts) // att a rota
    app.patch('/deactive', {onRequest: [verifyJWT]}, articlesController.deactive) // Certo
    app.patch('/active/:id', {onRequest: [verifyJWT]}, articlesController.active) // Certo
    app.delete('/', {onRequest: [verifyJWT]}, articlesController.delete) // Cert
    
}