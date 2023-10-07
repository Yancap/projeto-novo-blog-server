import fastify from "fastify";
import { ZodError, z } from 'zod'
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import cors from "@fastify/cors";

export const app = fastify({
    bodyLimit: 8048576 
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(cors, {
    origin: (origin, cb) => {
        console.log(origin);
        
        const hostname = new URL(origin as string).hostname
        if(hostname === "localhost"){
          cb(null, true)
          return
        } else if (hostname === "artechcms.netlify.app") {
            cb(null, true)
             return
        } else if (hostname === "artechblog.netlify.app") {
            cb(null, true)
             return
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false)
    },
    
})
app.register(routes)

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({ message: "Validation error", issues: error.format()})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message:"Internal Server Error" })
})