import { FastifyReply, FastifyRequest } from "fastify";
import { articlesActive } from "./articles-active";
import { articlesCreate } from "./articles-create";
import { articlesDeactive } from "./articles-deactive";
import { articlesDelete } from "./articles-delete";
import { articlesDrafts } from "./articles-drafts";
import { articlesGet } from "./articles-get";
import { articlesShowByManagerId } from "./articles-show-by-manager-id";
import { articlesUpdate } from "./articles-update";

export class ArticlesController {
    public create: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public delete: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public update: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public get: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public active: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public deactive: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public drafts: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public show: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;

    constructor(){
        this.create = articlesCreate;
        this.delete = articlesDelete;
        this.update = articlesUpdate;
        this.get = articlesGet;
        this.active = articlesActive;
        this.deactive = articlesDeactive;
        this.drafts = articlesDrafts;
        this.show = articlesShowByManagerId;
    }
}