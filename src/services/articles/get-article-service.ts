import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IGetArticleService{
    article_id?: string;
    slug?: string;
}

export class GetArticleService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({article_id, slug}: IGetArticleService){
        if (article_id) {
            const article = await this.articlesRepository.findById(article_id)
            return article 
        } else if (slug) {
            const article = await this.articlesRepository.findBySlug(slug)
            return article 
        }
        return null
    }
}