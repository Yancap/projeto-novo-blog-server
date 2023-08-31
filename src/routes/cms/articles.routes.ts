import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { articlesCreate } from "../../controller/cms/articles/articles-create"
import { articlesDrafts } from "../../controller/cms/articles/articles-drafts"
import { articlesDeactive } from "../../controller/cms/articles/articles-deactive"
import { articlesUpdate } from "../../controller/cms/articles/articles-update"
import { articlesDelete } from "../../controller/cms/articles/articles-delete"
import { articlesGet } from "../../controller/cms/articles/articles-get"
import { articlesShowByManagerId } from "../../controller/cms/articles/articles-show-by-manager-id"
import { articlesActive } from "../../controller/cms/articles/articles-active"

export async function articlesRoutes(app: FastifyInstance) {
    // Article routes
    
    app.get('/', {onRequest: [verifyJWT]}, articlesShowByManagerId) // Certo
    app.post('/get', articlesGet) // Certo
    app.post('/', {onRequest: [verifyJWT]}, articlesCreate) // Certo
    app.put('/', {onRequest: [verifyJWT]}, articlesUpdate) // Certo
    app.patch('/', {onRequest: [verifyJWT]}, articlesDrafts) // att a rota
    app.patch('/deactive', {onRequest: [verifyJWT]}, articlesDeactive) // Certo
    app.patch('/active', {onRequest: [verifyJWT]}, articlesActive) // Certo
    app.delete('/', {onRequest: [verifyJWT]}, articlesDelete) // Cert
    
}