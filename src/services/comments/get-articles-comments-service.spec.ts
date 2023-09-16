import { beforeEach, describe, expect, it } from 'vitest';
import { GetArticlesCommentsService } from './get-articles-comments-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory
let sut: GetArticlesCommentsService

describe('Get Articles and Comments Service', () => {

    beforeEach(async ()=>{
        database = new InMemoryDatabase()
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
        sut = new GetArticlesCommentsService(database.comments, database.articles)
    })

    it('should be able to get Articles Comments', async () => {
        const user = await database.users.register({
            name: "user", 
            email: "user@gmail.com",
            avatar: "",
        })
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            image: '',
            manager_id: "admin-01"
        })

        await database.comments.create({
            text: "asd",
            user_id: user.id,
            article_id: article.id
        })
        const comments  = await sut.handler({article_id: article.id})
        expect(comments?.article.id).toEqual(expect.any(String))
        expect(comments?.comments.length).toEqual(1)
        expect(comments?.comments[0].text).toEqual(expect.any(String))

    })

})