import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CreditsRepository } from './../../repository/interfaces/interface-credits-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCreditsService } from './create-credits-service';
import { InMemoryCredits } from '../../repository/in-memory/in-memory-credits';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';



let creditsRepository: CreditsRepository
let articlesRepository: ArticlesRepository

let sut: CreateCreditsService

describe('Create Credits Service', () => {

    beforeEach(()=>{
        creditsRepository = new InMemoryCredits()
        articlesRepository = new InMemoryArticles()
        sut = new CreateCreditsService(
            creditsRepository,
            articlesRepository
        )
    })

    it('should be able to create a Credits', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const credits = await sut.handler({
            name: "Google",
            link: "https://www.google.com",
            article_id: article.id
        })
        expect(credits.id).toEqual(expect.any(String))
    })

    it('should not be able to create a Credits without an Existent Article', async () => {
        
        await expect(sut.handler({
            name: "Google",
            link: "https://www.google.com",
            article_id: "inexistent-article-01",
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})