import { FastifyInstance } from "fastify";
import { cmsRoutes } from "./cms";
import { clientRoutes } from "./client";

export async function routes(app: FastifyInstance){
    app.register(cmsRoutes, {
        prefix: 'cms'
    })
    app.register(clientRoutes, {
        prefix: 'client'
    })
}