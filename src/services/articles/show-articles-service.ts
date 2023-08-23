import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IShowArticlesService{
    article_id: string;
}

export class ShowArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler(){
        const articles = await this.articlesRepository.showAll()
        return articles
    }
}