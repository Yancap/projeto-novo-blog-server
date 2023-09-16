import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCommentsService } from './create-comments-service';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory
let sut: CreateCommentsService

describe('Create Comments Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new CreateCommentsService(database.comments, database.articles)
    })

    it('should be able to create a Comment', async () => {
        await database.categories.create({
            category: "mobile",
            id: "mobile-01" 
        })
        await database.management.register({
            email: "",
            name: "",
            password: "",
            id: "admin-01" 
        })
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            image: '',
            manager_id: "admin-01"
        })
        
        const comments  = await sut.handler({
            text: "gostei do artigo",
            user_id: '',
            slug: article.slug
        })
        expect(comments.id).toEqual(expect.any(String))
    })
    it('should be able to create a Comment in Inexistent Article', async () => {
        await expect(() => 
        sut.handler({
            text: "gostei do artigo",
            user_id: '',
            slug: 'not-exist'
        }))
        .rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})