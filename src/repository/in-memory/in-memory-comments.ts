import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ArticlesRepository } from '../interfaces/interface-articles-repository';
import { UsersRepository } from '../interfaces/interface-users-repository';
import { ArticlesCommentsWithUser, CommentsRepository, CommentsWithUserName, DeleteComments, UserDeleteComments } from './../interfaces/interface-comments-repository';
import {  Prisma, Comments } from '@prisma/client';

interface ConstructorRepository {
    articlesRepository: ArticlesRepository
    usersRepository: UsersRepository

}
export class InMemoryComments implements CommentsRepository {
    public items: Comments[] = []
    private articles: ArticlesRepository
    private users: UsersRepository
    constructor (
        {articlesRepository, usersRepository}: ConstructorRepository
    ) {
        this.articles = articlesRepository
        this.users = usersRepository
    }
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
        
        const comment = this.items.find(item => item.id === id && item.article_id === article_id)
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
        const article = await this.articles.findById(article_id)
        const data: ArticlesCommentsWithUser[] = []

        if(article){
            const comments = await this.items.filter(comments => comments.article_id === article_id)
            for(let comment of comments) {
                const user = await this.users.findById(comment.user_id)
                if(!user) break
                data.push({
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    article: {
                        id: article.id,
                        slug: article.slug,
                        title: article.title,
                        category: {
                            category: article.category.category
                        }
                    },
                    text: comment.text,
                    article_id: comment.article_id,
                    created_at: comment.created_at,
                    id: comment.id,
                    user_id: comment.user_id
                })
            }
            return data
        }
        return null
    }
    async deleteByUser({ id, user_id }: UserDeleteComments){
        const user = await this.users.findById(user_id)
        
        if(!user) {
            throw new ForbiddenOperationError()
        }
        const comment = this.items.find(item => item.id === id && item.user_id === user.id)
        if (!comment) {
            throw new ForbiddenOperationError()  
        }
        this.items.filter(item => item.id === id)
        return comment
    }
}