import { ArticlesRepository, FindArticlesBySlug, ShowAllArticles, articleIdAndManagerIdProps } from '../interfaces/interface-articles-repository';
import { Articles, Prisma, Management } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { CategoriesRepository } from '../interfaces/interface-categories-repository';
import { ManagementRepository } from '../interfaces/interface-management-repository';
import { CreditsRepository } from '../interfaces/interface-credits-repository';
import { ArticlesTagsRepository } from '../interfaces/interface-articles-tags-repository';

interface ConstructorRepository {
    categoriesRepository: CategoriesRepository;
    managementRepository: ManagementRepository;
    creditsRepository: CreditsRepository;
    articlesTagsRepository: ArticlesTagsRepository;

}

export class InMemoryArticles implements ArticlesRepository {
    public items: Articles[] = []
    private categories: CategoriesRepository;
    private management: ManagementRepository;
    private credits: CreditsRepository;
    private articlesTags: ArticlesTagsRepository;
    constructor (
        {categoriesRepository, managementRepository, creditsRepository, articlesTagsRepository}: ConstructorRepository
    ) {
        this.categories = categoriesRepository;
        this.management = managementRepository;
        this.articlesTags = articlesTagsRepository;
        this.credits = creditsRepository;
    
    }
    async create(data: Prisma.ArticlesUncheckedCreateInput) {
        const slug = data.title.toLowerCase().replace(' ', '-') + 
        '-' + (randomUUID()).substring(0,6)

        if(!data.manager_id) throw new Error()

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
        const categories = await this.categories.getAllCategories()
        const authors = await this.management.findAuthors()
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
        const categories = await this.categories.getAllCategories()
        const authors = await this.management.findAuthors()
        const article = this.items.find(article => article.id === id)
        
        if (authors && article) {
            let articles: ShowAllArticles = {} as ShowAllArticles
            for(let category of categories) {
                if (category.id === article.category_id) {
                    articles = {...article, category: { category: category.category}} as ShowAllArticles
                }
            }
            for(let author of authors) {
                if (author.id === article.manager_id) {
                    articles = {...article, category: articles.category, manager: { name: author.name } }
                }
            }

            return articles
        }
        
        return null
    }

    async findBySlug(slug: string){
        
        const article = this.items.find(articles => articles.slug === slug)
        if (!article) {
            return null
        }
        const manager = await this.management.findById(article.manager_id as string)
        const category = await this.categories.findById(article.category_id)
        const articleTags = await this.articlesTags.selectTagsByArticleId(article.id)
        const credits = await this.credits.findCreditsByArticleId(article.category_id)
        if(!manager || !category) {
            return null
        }
        return {
            ...article,
            category: {
                category: category.category
            },
            articleTags: articleTags || [],
            credits: credits || [],
            manager: {
                name: manager.name,
                avatar: manager.avatar
            }
        }
    }
    async showAllForClients(){
        const articleDB = this.items
        if (!articleDB) {
            return []
        }
        const articles = []
        for (let article of articleDB) {
            const manager = await this.management.findById(article.manager_id as string)
            const category = await this.categories.findById(article.category_id)
            const articleTags = await this.articlesTags.selectTagsByArticleId(article.id)
            const credits = await this.credits.findCreditsByArticleId(article.category_id)
            if(!manager || !category) break
            articles.push({
                ...article,
                category: {
                    category: category.category
                },
                articleTags: articleTags || [],
                credits: credits || [],
                manager: {
                    name: manager.name,
                    avatar: manager.avatar
                }
            })
        }
        return articles
    }
    async findByCategory(category: string){
        const articleCategory = await this.categories.findCategory(category)
        if (!articleCategory) return []

        const articleDB = this.items.filter(article => article.category_id === articleCategory.id)
        if (!articleDB) {
            return []
        }
        const articles = []
        for (let article of articleDB) {
            const manager = await this.management.findById(article.manager_id as string)
            const articleTags = await this.articlesTags.selectTagsByArticleId(article.id)
            const credits = await this.credits.findCreditsByArticleId(article.category_id)
            if(!manager || !category) break
            articles.push({
                ...article,
                category: {
                    category: articleCategory.category
                },
                articleTags: articleTags || [],
                credits: credits || [],
                manager: {
                    name: manager.name,
                    avatar: manager.avatar
                }
            })
        }
        return articles
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

        if(!data.manager_id) throw new Error()

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