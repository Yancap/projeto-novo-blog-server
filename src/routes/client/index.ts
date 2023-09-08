import { FastifyInstance } from "fastify";
import {  usersRoutes } from "./users.routes";
import { commentsRoutes } from "./comments.routes";
import { articlesRoutes } from "./articles.routes";
import { categoriesRoutes } from "./categories.routes";


export async function clientRoutes(app: FastifyInstance){
    app.register(usersRoutes, {
        prefix: 'users',
    })
    app.register(articlesRoutes, {
        prefix: 'articles',
    })
    app.register(commentsRoutes, {
        prefix: 'comments'
    }),
    app.register(categoriesRoutes, {
        prefix: 'categories'
    })
}