import { CreditsRepository } from './../interfaces/interface-credits-repository';
import { Credits, Prisma } from '@prisma/client';


export class InMemoryCredits implements CreditsRepository {
    public items: Credits[] = []

    async create(data: Prisma.CreditsUncheckedCreateInput) {
        const credits = {
            id: data.id ?? 'tag-01',
            name: data.name,
            link: data.link,
            article_id: data.article_id || null
        }
        this.items.push(credits)
        return credits
    }
    async findCreditsByArticleId(article_id: string) {
        const credits = this.items.filter(credit => credit.article_id === article_id)
        if(!credits) {
            return null
        }
        return credits.map(credit => ({name: credit.name, link: credit.link}))
    }
    

}