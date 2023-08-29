import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface ICreateCommentsService{
    text: string;
    article_id: string;
    user_id: string;

}

export class CreateCommentsService {
    constructor(
        private commentsRepository: CommentsRepository,
        private articlesRepository: ArticlesRepository
    ) { }
    async handler({text, user_id, article_id}: ICreateCommentsService){
        const article = await this.articlesRepository.findById(article_id)
        if (!article) {
            throw new ResourceNotFoundError()
        }
        const comment = await this.commentsRepository.create({text, user_id, article_id})
        return comment
    }
}