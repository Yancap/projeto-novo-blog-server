import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { articlesRoutes } from "./articles.routes";
import { categoriesRoutes } from "./categories.routes";

export async function cmsRoutes(app: FastifyInstance){
    app.register(authRoutes)
    app.register(adminRoutes, {
        prefix: 'admin'
    })
    app.register(articlesRoutes, {
        prefix: 'articles'
    })
    app.register(categoriesRoutes, {
        prefix: 'categories'
    })
}