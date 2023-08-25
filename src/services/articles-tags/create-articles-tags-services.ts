import { TagsRepository } from './../../repository/interfaces/interface-tags-repository';
import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { ArticlesTagsRepository } from '../../repository/interfaces/interface-articles-tags-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface ICreateArticlesTagsService{
    id?: string;
    article_id: string;
    tag_id: string;
}

export class CreateArticlesTagsService {
    constructor(
        private articlesTagsRepository: ArticlesTagsRepository,
        private articlesRepository: ArticlesRepository,
        private tagsRepository: TagsRepository
    ) { }
    async handler({id, article_id, tag_id}: ICreateArticlesTagsService){

        const article = await this.articlesRepository.findById(article_id)
        if (!article) {
            throw new ResourceNotFoundError()
        }
        
        const tag = await this.tagsRepository.findById(tag_id)
        if (!tag) {
            throw new ResourceNotFoundError()
        }

        if (id) {
            const articles_tagsExists = await this.articlesTagsRepository.findById(id)
            if(articles_tagsExists) return articles_tagsExists
        }
        const articles_tags = await this.articlesTagsRepository.create({article_id, tag_id})
        return articles_tags
    }
}