import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ArticlesRepository } from '../interfaces/interface-articles-repository';
import { UsersRepository } from '../interfaces/interface-users-repository';
import { CommentsRepository, CommentsWithUserName, DeleteComments } from './../interfaces/interface-comments-repository';
import {  Prisma, Comments } from '@prisma/client';


export class InMemoryComments implements CommentsRepository {
    public items: Comments[] = []
    constructor (
        private inMemoryArticles: ArticlesRepository,
        private inMemoryUsers: UsersRepository
    ) {}
    async create(data: Prisma.CommentsUncheckedCreateInput) {
        const comments: Comments = {
            id: data.id ?? 'comments-01',
            text: data.text,
            article_id: data.article_id ?? "",
            user_id: data.user_id,
            created_at: new Date()
        }
        this.items.push(comments)
        return comments
    }
    async delete({id, article_id}: DeleteComments){
        const comment = await this.findById(id)
        if (!comment) {
            throw new ResourceNotFoundError()
        }
        this.items = this.items.filter(comments => comments.id !== id)
        return comment
    }
    async findById(id: string){
        
        const comments = this.items.find(comments => comments.id === id)
        if (!comments) {
            return null
        }
        return comments
    }

    async findByArticleId( article_id:string ){
        const article = await this.inMemoryArticles.findById(article_id)
        const data: CommentsWithUserName[] = []

        if(article){
            const comments = await this.items.filter(comments => comments.article_id === article_id)
            for(let comment of comments) {
                const user = await this.inMemoryUsers.findById(comment.user_id)
                if(!user) return null
                data.push({
                    id: comment.id,
                    text: comment.text,
                    created_at: comment.created_at,
                    user_name: user?.name 
                })
            }
            return {
                comments: data,
                article: {
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    category: article.category.category
                }
            }
        }
        return null
        
        
    }
}