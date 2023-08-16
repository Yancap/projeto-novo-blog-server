import { CreditsRepository } from './../interfaces/interface-credits-repository';
import { Credits, Prisma } from '@prisma/client';


export class InMemoryCredits implements CreditsRepository {
    public items: Credits[] = []

    async create(data: Prisma.CreditsUncheckedCreateInput) {
        const credits = {
            id: data.id ?? 'tag-01',
            name: data.name,
            link: data.link,
            article_id: data.article_id
        }
        this.items.push(credits)
        return credits
    }
    async findCreditsByName(name: string) {
        const credits = this.items.find(credit => credit.name === name)
        if(!credits) {
            return null
        }
        return credits
    }
    

}