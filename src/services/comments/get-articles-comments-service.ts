import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IGetArticlesComments{
    article_id?: string
    slug?:string
}

export class GetArticlesCommentsService {
    constructor(
        private commentsRepository: CommentsRepository,
        private articlesRepository: ArticlesRepository
    ) { }
    async handler({article_id, slug}: IGetArticlesComments){
        if(slug && !article_id){
            const art = await this.articlesRepository.findBySlug(slug);
            
            if(!art) return null;

            const comment = await this.commentsRepository.findByArticleId(art.id)
            if (comment && comment.length !== 0) {
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
                        user_email: comment.user.email
                    }
                })
                return {
                    article,
                    comments
                }
            }
            return null
        }
        if(!article_id) return null
        const comment = await this.commentsRepository.findByArticleId(article_id)
        if (comment && comment.length !== 0) {
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
        return null
    }
}