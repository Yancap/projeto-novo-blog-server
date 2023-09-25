import { FastifyReply, FastifyRequest } from "fastify";
import { commentsGetArticlesComments } from "./handler-comments-get-articles-comments";
import { commentsManagerDelete } from "./handler-comments-manager-delete"

export class CommentsController {
    public managerDelete: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public get: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    constructor(){
        this.managerDelete = commentsManagerDelete;
        this.get = commentsGetArticlesComments;
    }
}