import { CommentsRepository } from './../interfaces/interface-comments-repository';
import {  Prisma, Comments } from '@prisma/client';


export class InMemoryComments implements CommentsRepository {
    public items: Comments[] = []

    async create(data: Prisma.CommentsUncheckedCreateInput) {
        const comments: Comments = {
            id: data.id ?? 'comments-01',
            text: data.text,
            article_id: data.article_id,
            user_id: data.user_id,
            created_at: new Date()
        }
        this.items.push(comments)
        return comments
    }
    async delete(id: string){
        this.items = this.items.filter(comments => comments.id !== id)
        return this.items
    }
    async findById(id: string){
        const comments = this.items.find(comments => comments.id === id)
        if (!comments) {
            return null
        }
        return comments
    }
}