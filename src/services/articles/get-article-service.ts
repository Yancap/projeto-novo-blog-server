import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IGetArticleService{
    article_id: string;
}

export class GetArticleService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({article_id}: IGetArticleService){
        const article = await this.articlesRepository.findById(article_id)
        return article
    }
}