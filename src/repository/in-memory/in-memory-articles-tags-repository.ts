import { ArticlesTagsRepository } from './../interfaces/interface-articles-tags-repository';
import { ArticlesTags, Prisma } from '@prisma/client';


export class InMemoryArticleTags implements ArticlesTagsRepository {
    public items: ArticlesTags[] = []

    async create(data: Prisma.ArticlesTagsUncheckedCreateInput) {
        const articles_tags = {
            id: data.id ?? 'articles-tag-01',
            tag_id: data.tag_id,
            article_id: data.article_id
        }
        this.items.push(articles_tags)
        return articles_tags
    }
    async selectByTagsId(tag_id: string) {
        const articles_tags = this.items.filter(articles_tags => 
            articles_tags.tag_id === tag_id
        )

        if(!articles_tags) {
            return null
        }
        return articles_tags
    }
    async selectByArticleId(article_id: string) {
        const articles_tags = this.items.filter(articles_tags => 
            articles_tags.article_id === article_id
        )
        
        if(!articles_tags) {
            return null
        }
        return articles_tags
    }

}