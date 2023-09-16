import { FastifyReply, FastifyRequest } from "fastify";
import { adminDeleteArticles } from "./handler-admin-delete-articles";
import { adminDeleteAuthors } from "./handler-admin-delete-authors";
import { adminGetAllArticles } from "./handler-admin-get-all-articles";
import { adminGetAuthors } from "./handler-admin-get-authors";
import { adminRegister } from "./handler-admin-register";

export class AdminController {
    public deleteArticles: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public deleteAuthors: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public getAllArticles: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public getAuthors: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    public registerManager: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;

    constructor(){
        this.deleteArticles = adminDeleteArticles;
        this.deleteAuthors = adminDeleteAuthors;
        this.getAllArticles = adminGetAllArticles;
        this.getAuthors = adminGetAuthors;
        this.registerManager = adminRegister;
    }
}