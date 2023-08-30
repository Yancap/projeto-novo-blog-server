import { ArticlesTagsRepository } from '../../repository/interfaces/interface-articles-tags-repository';
import { TagsRepository } from '../../repository/interfaces/interface-tags-repository';

interface IGetTagsByArticleId{
    article_id: string;
}

export class GetTagsByArticleId {
    constructor(
        private tagsRepository: TagsRepository,
        private articlesTagsRepository: ArticlesTagsRepository,
    ) { }
    async handler({article_id}: IGetTagsByArticleId){
        const tagsId = await this.articlesTagsRepository.selectByArticleId(article_id)
        if(tagsId) {
            const tags = []
            for(let tagId of tagsId){
                const tag = await this.tagsRepository.findById(tagId.tag_id)
                tags.push(tag)
            }
            return tags
        }   
        return null
    }
}