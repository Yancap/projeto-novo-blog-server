import { beforeEach, describe, expect, it } from 'vitest';
import { CreateArticleService } from './create-articles-service';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';


let database: DatabaseMemory;
let sut: CreateArticleService

describe('Create Articles Service', () => {

    beforeEach(async ()=>{
        database = new InMemoryDatabase()
        await database.categories.create({category: "mobile"})
        sut = new CreateArticleService(
            database.articles,
            database.categories,
            database.management
        )
    })

    it('should be able to create a Articles', async () => {

        const management = await database.management.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })

        const article = await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            image: '',
            text: "Texto sobre o artigo",
            category: "mobile",
            manager_id: management.id
        })

        expect(article.id).toEqual(expect.any(String))
    })
    it('should be able to draft a Articles', async () => {

        const management = await database.management.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })

        const article = await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            image: '',
            text: "Texto sobre o artigo",
            category: "mobile",
            manager_id: management.id,
            state: "draft"
        })

        expect(article.id).toEqual(expect.any(String))
    })
    it('should not be able to create a Articles without Manager', async () => {

        expect(async () => 
        await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            image: '',
            category: "mobile",
            manager_id: ""
        }))
        .rejects.toBeInstanceOf(ForbiddenOperationError)
    })
    it('should be able to create a Articles without a Category Existent', async () => {
        
        const management = await database.management.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })

        const article = await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category: "front-end",
            image: '',
            manager_id: management.id
        })

        expect(article.id).toEqual(expect.any(String))
    })
    
})