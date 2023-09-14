import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IDeleteCommentsFromArticlesService{
    comment_id: string
    article_id: string
    manager_id: string
}

export class DeleteCommentsFromArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository,
        private commentsRepository: CommentsRepository
    ) { }
    async handler({ article_id, comment_id, manager_id}: IDeleteCommentsFromArticlesService){
        
        const article = await this.articlesRepository.findByArticleIdAndManagerId({article_id, manager_id})
        if (!article) {
            throw new ForbiddenOperationError()
        }
        
        const otherComments = await this.commentsRepository.delete({id: comment_id, article_id: article.id})
        const isDelete = otherComments.id === comment_id
        if (!isDelete) {
            return false
        }
        return true
    }
}