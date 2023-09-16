import { ArticlesTagsRepository } from '../interfaces/interface-articles-tags-repository';
import { ArticlesTags, Prisma } from '@prisma/client';
import { TagsRepository } from '../interfaces/interface-tags-repository';

interface ConstructorRepository {
    tagsRepository: TagsRepository;

}
export class InMemoryArticleTags implements ArticlesTagsRepository {
    public items: ArticlesTags[] = []
    private tags: TagsRepository;
    constructor({tagsRepository}: ConstructorRepository) {
        this.tags = tagsRepository;

    }
    async create(data: Prisma.ArticlesTagsUncheckedCreateInput) {
        const articles_tags = {
            id: data.id ?? 'articles-tag-01',
            tag_id: data.tag_id,
            article_id: data.article_id || null
        }
        this.items.push(articles_tags)
        return articles_tags
    }
    async findById(id: string) {
        const articles_tags = this.items.find(articles_tags => 
            articles_tags.id === id 
        )

        if(!articles_tags) {
            return null
        }
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
    async selectTagsByArticleId(article_id: string) {
        const articles_tags = this.items.filter(articles_tags => 
            articles_tags.article_id === article_id
        )
        
        if(!articles_tags) {
            return null
        }
        let tags = []
        for(let articleTag of articles_tags){
            const tag = await this.tags.findById(articleTag.tag_id)
            if (tag && tag.name) {
                tags.push({tag: {tag: tag.name, id: tag.id}})
            }
        }
        
        return tags
    }
    async selectArticlesTags() {
        
    }
}