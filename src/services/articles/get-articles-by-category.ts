import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IGetArticlesByCategoryService{
    category: string;
}

export class GetArticlesByCategoryService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({category}: IGetArticlesByCategoryService){
        
        const articlesRaw = await this.articlesRepository.findByCategory(category)
        if(!articlesRaw) throw new ResourceNotFoundError()
        const articles = articlesRaw.map(article => ({
            slug: article.slug,
            title: article.title,
            subtitle: article.subtitle,
            text: article.text,
            image: article.image,
            created_at: new Date(article.created_at).toLocaleString([], {  month: 'long', day: 'numeric', year: "numeric" }),
            state: article.state,
            category: article.category.category,
            author:  {
                name: article.manager?.name,
                avatar: article.manager?.avatar
            },
            credits: article.credits,
            tags: article.articleTags.map( art => art.tag.tag)
        }))
        return articles 
    }
}