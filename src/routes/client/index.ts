import { FastifyInstance } from "fastify";
import {  usersRoutes } from "./users.routes";
import { commentsRoutes } from "./comments.routes";


export async function clientRoutes(app: FastifyInstance){
    app.register(usersRoutes, {
        prefix: 'users',
    })
    app.register(commentsRoutes, {
        prefix: 'comments'
    })
}