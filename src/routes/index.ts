import { FastifyInstance } from "fastify";
import { cmsRoutes } from "./cms";

export async function routes(app: FastifyInstance){
    app.register(cmsRoutes, {
        prefix: 'cms'
    })
}