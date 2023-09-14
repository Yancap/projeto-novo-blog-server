import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IDeleteArticlesService{
    article_id: string;
    manager_id: string;
}

export class DeleteArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository,
    ) { }
    async handler({article_id, manager_id}: IDeleteArticlesService){
        const article = await this.articlesRepository.findById(article_id)
        
        if(!article || article.manager_id !== manager_id){
            throw new ForbiddenOperationError()
        }
        const thisArticles = await this.articlesRepository.delete({article_id, manager_id})
        const isDelete = thisArticles.id === article_id
        if (!isDelete) {
            return false
        }
        return true
    }
}