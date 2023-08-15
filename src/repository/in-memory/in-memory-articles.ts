import { ArticlesRepository, findByArticleIdAndManagerIdProps } from '../interfaces/interface-articles-repository';
import {  Articles, Prisma } from '@prisma/client';


export class InMemoryArticles implements ArticlesRepository {
    public items: Articles[] = []

    async create(data: Prisma.ArticlesUncheckedCreateInput) {
        
        const article: Articles = {
            id: data.id ?? 'article-01',
            title: data.title,
            subtitle: data.subtitle,
            text: data.text,
            created_at: new Date(),
            category_id: data.category_id,
            manager_id: data.manager_id,
            state: data.state ?? "active"
        }
        this.items.push(article)
        return article
    }
    
    async delete(id: string) {
        this.items = this.items.filter(articles => articles.id !== id)
        return this.items
    }

    async findById(id: string){
        const article = this.items.find(articles => articles.id === id)
        if (!article) {
            return null
        }
        return article
    }
    async findByArticleIdAndManagerId({article_id, manager_id}: findByArticleIdAndManagerIdProps){
        const article = this.items.find(articles => articles.id === article_id && articles.manager_id === manager_id)
        if (!article) {
            return null
        }
        return article
    }
    async update(data: Prisma.ArticlesUncheckedCreateInput){
        this.items = this.items.filter(articles => articles.id !== data.id)
        const article: Articles = {
            id: data.id ?? 'article-01',
            title: data.title,
            subtitle: data.subtitle,
            text: data.text,
            created_at: new Date(),
            category_id: data.category_id,
            manager_id: data.manager_id,
            state: data.state ?? "active"
        }
        this.items.push(article)
        return article
    }
}