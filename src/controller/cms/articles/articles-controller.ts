import { FastifyReply, FastifyRequest } from "fastify";
import { articlesActive } from "./handler-articles-active";
import { articlesCreate } from "./handler-articles-create";
import { articlesDeactive } from "./handler-articles-deactive";
import { articlesDelete } from "./handler-articles-delete";
import { articlesDraftWithArticleId } from "./handler-articles-draft-with-article-id";
import { articlesDrafts } from "./handler-articles-drafts";
import { articlesGet } from "./handler-articles-get";
import { articlesShowByManagerId } from "./handler-articles-show-by-manager-id";
import { articlesUpdate } from "./handler-articles-update";

export class ArticlesController {
    public create: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public delete: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public update: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public get: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public active: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public deactive: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public drafts: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public draftsWithArticleId: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public show: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;

    constructor(){
        this.create = articlesCreate;
        this.delete = articlesDelete;
        this.update = articlesUpdate;
        this.get = articlesGet;
        this.active = articlesActive;
        this.deactive = articlesDeactive;
        this.drafts = articlesDrafts;
        this.draftsWithArticleId = articlesDraftWithArticleId;
        this.show = articlesShowByManagerId;
    }
}