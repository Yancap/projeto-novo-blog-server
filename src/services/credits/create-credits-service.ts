import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CreditsRepository } from '../../repository/interfaces/interface-credits-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface ICreateCreditsService{
    id?: string;
    name: string;
    link: string;
    article_id: string;
}

export class CreateCreditsService {
    constructor(
        private creditsRepository: CreditsRepository,
        private articlesRepository: ArticlesRepository,

    ) { }
    async handler({id, name, link, article_id}: ICreateCreditsService){
        
        const article = await this.articlesRepository.findById(article_id)
        if (!article) {
            throw new ResourceNotFoundError()
        }

        const credits = await this.creditsRepository.create({
            id, name, link, article_id
        })
        return credits
    }
}