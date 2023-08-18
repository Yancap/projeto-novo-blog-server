import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IDeleteCommentsFromArticlesService{
    comment_id: string
    slug: string
    manager_id: string
}

export class DeleteCommentsFromArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository,
        private commentsRepository: CommentsRepository
    ) { }
    async handler({ slug, comment_id, manager_id}: IDeleteCommentsFromArticlesService){
        const comment = await this.commentsRepository.findById(comment_id)
        if (!comment) {
            throw new ResourceNotFoundError()
        }

        const article = await this.articlesRepository.findBySlug(slug)
        if (!article) {
            throw new ResourceNotFoundError()
        }

        const isAuthorOfArticle = article.manager_id === manager_id
        if (!isAuthorOfArticle) {
            throw new ForbiddenOperationError()
        }

        const otherComments = await this.commentsRepository.delete(comment.id)
        const isDelete = otherComments?.find(other => other.id === comment.id)
        if (isDelete) {
            return false
        }
        return true
    }
}