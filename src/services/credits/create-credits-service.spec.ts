import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCreditsService } from './create-credits-service';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: CreateCreditsService

describe('Create Credits Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new CreateCreditsService(
            database.credits,
            database.articles
        )
    })

    it('should be able to create a Credits', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const credits = await sut.handler({
            name: "Google",
            link: "https://www.google.com",
            article_id: article.id
        })
        expect(credits.name).toEqual(expect.any(String))
    })

    it('should not be able to create a Credits without an Existent Article', async () => {
        
        await expect(sut.handler({
            name: "Google",
            link: "https://www.google.com",
            article_id: "inexistent-article-01",
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})