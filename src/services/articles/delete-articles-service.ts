import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IDeleteArticlesService{
    id: string;
    manager_id: string;
}

export class DeleteArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({id, manager_id}: IDeleteArticlesService){


        const article = await this.articlesRepository.findById(id)
        if (!article) {
            throw new ResourceNotFoundError()
        }

        const isAuthorOfArticle = article.manager_id === manager_id
        if (!isAuthorOfArticle) {
            throw new ForbiddenOperationError()
        }

        const thisArticles = await this.articlesRepository.delete(article.id)
        const isDelete = thisArticles.id === article.id
        if (isDelete) {
            return false
        }
        return true
    }
}