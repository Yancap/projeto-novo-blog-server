import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IGetArticlesComments{
    article_id: string
}

export class GetArticlesCommentsService {
    constructor(
        private commentsRepository: CommentsRepository
    ) { }
    async handler({article_id}: IGetArticlesComments){
        const comment = await this.commentsRepository.findByArticleId(article_id)
        if (comment) {
            const article = {
                ...comment[0].article,
                category: comment[0].article?.category.category
            }

            const comments = comment.map(comment => {
                return {
                    id: comment.id,
                    text: comment.text,
                    created_at: comment.created_at,
                    user_name: comment.user.name,
                }
            })
            return {
                article,
                comments
            }
        }
        
        return comment
    }
}