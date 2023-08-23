import { ArticlesRepository, articleIdAndManagerIdProps } from '../interfaces/interface-articles-repository';
import {  Articles, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';


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
    async showAll(){
        return this.items
    }
    async delete({article_id, manager_id}: articleIdAndManagerIdProps) {

        const article = await this.findById(article_id)
        if (!article) {
            throw new ResourceNotFoundError()
        }
        
        const isAuthorOfArticle = article.manager_id === manager_id
        if (!isAuthorOfArticle) {
            throw new ForbiddenOperationError()
        }
        this.items = this.items.filter(articles => articles.id !== article_id)
        return article  
    }
    async deleteByAdmin({article_id}: Omit<articleIdAndManagerIdProps, "manager_id">) {

        const article = await this.findById(article_id)
        if (!article) {
            throw new ResourceNotFoundError()
        }
        
        this.items = this.items.filter(articles => articles.id !== article_id)
        return article  
        
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

    async findByArticleIdAndManagerId({article_id, manager_id}: articleIdAndManagerIdProps){
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