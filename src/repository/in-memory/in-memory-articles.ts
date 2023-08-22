import { ArticlesRepository, findByArticleIdAndManagerIdProps } from '../interfaces/interface-articles-repository';
import {  Articles, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';


export class InMemoryArticles implements ArticlesRepository {
    public items: Articles[] = []

    async create(data: Prisma.ArticlesUncheckedCreateInput) {
        const slug = data.title.toLowerCase().replace(' ', '-') + 
        '-' + (randomUUID()).substring(0,6)
        
        const article: Articles = {
            id: data.id ?? 'article-01',
            title: data.title,
            slug: slug,
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
        const article = this.items.find(articles => articles.id === id)
        this.items = this.items.filter(articles => articles.id !== id)
        if(article) {
          return article  
        }
        throw new ResourceNotFoundError()
    }

    async findById(id: string){
        const article = this.items.find(articles => articles.id === id)
        if (!article) {
            return null
        }
        return article
    }

    async findBySlug(slug: string){
        const article = this.items.find(articles => articles.slug === slug)
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
        
        const slug = data.title.toLowerCase().replace(' ', '-') + 
        '-' + (randomUUID()).substring(0,6)

        this.items = this.items.filter(articles => articles.id !== data.id)
        const article: Articles = {
            id: data.id ?? 'article-01',
            slug: slug,
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