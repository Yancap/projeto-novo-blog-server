import { ArticlesRepository } from '../interfaces/interface-articles-repository';
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
    
    // async findCategory(name: string) {
    //     const item = this.items.find(category => category.category === name)
    //     if(!item) {
    //         return null
    //     }
    //     return item
    // }

}