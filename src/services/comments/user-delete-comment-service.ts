import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IUserDeleteCommentsService{
    comment_id: string
    user_id: string

}

export class UserDeleteCommentsService {
    constructor(
        private commentsRepository: CommentsRepository
    ) { }
    async handler({comment_id, user_id}: IUserDeleteCommentsService){

        const otherComments = await this.commentsRepository.deleteByUser({id: comment_id, user_id})
        const isDelete = otherComments.id === comment_id
        if (!isDelete) {
            return false
        }
        return true
    }
}