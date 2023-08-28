import { ArticlesRepository, ShowAllArticles, articleIdAndManagerIdProps } from '../interfaces/interface-articles-repository';
import {  Articles, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { CategoriesRepository } from '../interfaces/interface-categories-repository';
import { ManagementRepository } from '../interfaces/interface-management-repository';


export class InMemoryArticles implements ArticlesRepository {
    public items: Articles[] = []
    
    constructor (
        private inMemoryCategories: CategoriesRepository,
        private inMemoryManagement: ManagementRepository
    ) {}
    async create(data: Prisma.ArticlesUncheckedCreateInput) {
        const slug = data.title.toLowerCase().replace(' ', '-') + 
        '-' + (randomUUID()).substring(0,6)
        
        const article: Articles = {
            id: data.id ?? 'article-01',
            title: data.title,
            slug: slug,
            subtitle: data.subtitle,
            image: data.image,
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
        const categories = await this.inMemoryCategories.getAllCategories()
        const authors = await this.inMemoryManagement.findAuthors()
        if (categories && authors) {
            const articles: ShowAllArticles[] = this.items.map(article => {
                let articles: any = {}
                for(let category of categories) {
                    if (category.id === article.category_id) {
                        articles = {...article, category: { category: category.category}}
                    }
                }
                for(let author of authors) {
                    if (author.id === article.manager_id) {
                        articles = {...articles, manager: { name: author.name}}
                    }
                }
                return articles
            })
            return articles
        }
        
        return null
    }
    async showAllByManagerId(manager_id: string){
        return this.items.filter(article => article.manager_id === manager_id)
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
            image: data.image,
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