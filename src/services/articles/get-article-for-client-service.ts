import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';


export class GetArticleForClientService {
    constructor(
        private articlesRepository: ArticlesRepository
    ) { }
    async handler(slug: string){
        const articles = await this.articlesRepository.findBySlug(slug)
        if (!articles) {
            return null
        }
        return {
            slug: articles.slug,
            title: articles.title,
            subtitle: articles.subtitle,
            text: articles.text,
            image: articles.image,
            created_at: new Date(articles.created_at).toLocaleString([], {  month: 'long', day: 'numeric', year: "numeric" }),
            state: articles.state,
            category: articles.category.category,
            author:  {
                name: articles.manager?.name,
                avatar: articles.manager?.avatar
            },
            credits: articles.credits,
            tags: articles.articleTags.map( art => art.tag.tag)
        }
    }
}