import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CreditsRepository } from '../../repository/interfaces/interface-credits-repository';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

interface IGetCreditsByArticleIdService{
    article_id: string;
}

export class GetCreditsByArticleIdService {
    constructor(
        private creditsRepository: CreditsRepository

    ) { }
    async handler({article_id}: IGetCreditsByArticleIdService){
        
        const credits = await this.creditsRepository.findCreditsByArticleId(article_id)
        if (!credits) {
            throw new ResourceNotFoundError()
        }
        return credits
    }
}