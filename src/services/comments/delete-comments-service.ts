import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IDeleteCommentsService{
    id: string
    slug: string

}

export class DeleteCommentsService {
    constructor(
        private commentsRepository: CommentsRepository,
        private articlesRepository: ArticlesRepository
    ) { }
    async handler({id, slug}: IDeleteCommentsService){
        const comment = await this.commentsRepository.findById(id)

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        const article = await this.articlesRepository.findBySlug(slug)
        if (!article) {
            throw new ResourceNotFoundError()
        }

        const otherComments = await this.commentsRepository.delete(comment.id)
        const isDelete = otherComments?.find(other => other.id === comment.id)
        if (isDelete) {
            return false
        }
        return true
    }
}