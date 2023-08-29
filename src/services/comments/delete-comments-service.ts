import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IDeleteCommentsService{
    comment_id: string
    article_id: string

}

export class DeleteCommentsService {
    constructor(
        private commentsRepository: CommentsRepository
    ) { }
    async handler({comment_id, article_id}: IDeleteCommentsService){

        const otherComments = await this.commentsRepository.delete({id: comment_id, article_id})
        const isDelete = otherComments.id === comment_id
        if (!isDelete) {
            return false
        }
        return true
    }
}