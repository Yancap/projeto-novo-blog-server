import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';



export class AdminGetAllArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository
    ) { }
    async handler(){
        const articles = await this.articlesRepository.showAll()
        if (!articles) {
            return null
        }
        return articles.map(article => ({
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            text: article.text,
            category: article.category.category,
            author: article.manager?.name,
            created_at: article.created_at,
            state: article.state,
        }))
    }
}