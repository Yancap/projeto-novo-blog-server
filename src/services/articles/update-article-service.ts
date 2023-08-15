import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { Categories } from '@prisma/client';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface IUpdateArticleService{
    id: string;
    title?: string;
    subtitle?: string;
    text?: string;
    created_at?: string;
    state?: string;
    category?: string;
    management_id: string;
}

export class UpdateArticleService {
    constructor(
        private ArticlesRepository: ArticlesRepository,
        private CategoriesRepository: CategoriesRepository
    ) { }
    async handler({id, title, subtitle, text, management_id, category, state}: IUpdateArticleService){

        let articleCategory: Categories | null = {} as Categories
        if (category) {
            articleCategory = await this.CategoriesRepository.findCategory(category)
            if (!articleCategory) {
                articleCategory = await this.CategoriesRepository.create({category})
            }
        }

        const article = await this.ArticlesRepository
        .findByArticleIdAndManagerId({article_id: id, manager_id: management_id});
        if (!article) {
            //Caso o artigo não for encontrado ou o usuário não for o criado desse artigo
            throw new ForbiddenOperationError()
        }

        const updateArticle = this.ArticlesRepository.update({
            id: id,
            title: title ?? article.title, 
            subtitle: subtitle ?? article.subtitle, 
            text: text ?? article.text, 
            state: state ?? article.state,
            category_id: articleCategory.id ?? article.category_id,
            manager_id: management_id
        })
        
        return updateArticle
    }
}