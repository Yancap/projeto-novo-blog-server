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

export async function articlesRoutes(app: FastifyInstance) {
    // Article routes
    /*
        Criar, Editar, Excluir, Rascunhar, Desativar e Ver
    */
    app.get('/', {onRequest: [verifyJWT]}, articlesShowByManagerId)
    app.post('/get', articlesGet)
    app.post('/', {onRequest: [verifyJWT]}, articlesCreate) // Certo
    app.put('', {onRequest: [verifyJWT]}, articlesUpdate) // Certo
    app.patch('/draft', {onRequest: [verifyJWT]}, articlesDrafts) // Certo
    app.patch('/deactive', {onRequest: [verifyJWT]}, articlesDeactive) // Certo
    app.delete('', {onRequest: [verifyJWT]}, articlesDelete)
    
}