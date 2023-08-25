import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IShowArticlesByManagerIdService{
    manager_id: string;
}

export class ShowArticlesByManagerIdService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({manager_id}: IShowArticlesByManagerIdService){
        const articles = await this.articlesRepository.showAllByManagerId(manager_id)
        return articles
    }
}