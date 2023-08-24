import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { articlesCreate } from "../../controller/cms/articles/articles-create"
import { articlesDrafts } from "../../controller/cms/articles/articles-drafts"
import { articlesDeactive } from "../../controller/cms/articles/articles-deactive"

export async function articlesRoutes(app: FastifyInstance) {
    // Article routes
    /*
        Criar, Editar, Excluir, Rascunhar, Desativar e Ver
    */
    app.get('/show', {onRequest: [verifyJWT]},() => {})
    app.post('/create', {onRequest: [verifyJWT]}, articlesCreate) // Certo
    app.put('/update', {onRequest: [verifyJWT]}, () => {})
    app.patch('/draft', {onRequest: [verifyJWT]}, articlesDrafts) // Certo
    app.patch('/deactive', {onRequest: [verifyJWT]}, articlesDeactive) // Certo
    app.post('/delete', {onRequest: [verifyJWT]}, () => {})
}