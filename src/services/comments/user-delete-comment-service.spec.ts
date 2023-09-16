import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { UserDeleteCommentsService } from './user-delete-comment-service';

let database: DatabaseMemory
let sut: UserDeleteCommentsService

describe('User delete comment Service', () => {

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
        sut = new UserDeleteCommentsService(database.comments)
    })

    it('should be able to user delete his comment', async () => {
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

        const comment = await database.comments.create({
            text: "asd",
            user_id: user.id,
            article_id: article.id
        })
        const isDelete  = await sut.handler({user_id: user.id, comment_id: comment.id})
        expect(isDelete).toBe(true)

    })
    it('should be not able to a not user delete others users comments', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            image: '',
            manager_id: "admin-01"
        })

        const comment = await database.comments.create({
            text: "asd",
            user_id: "other-user",
            article_id: article.id
        })
        await expect(() => 
        sut.handler({
            user_id: "not-user", 
            comment_id: comment.id
        }))
        .rejects.toBeInstanceOf(ForbiddenOperationError)

    })
    it('should be not able to a user delete others users comments', async () => {
        const user = await database.users.register({
            id: "this-user",
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

        const comment = await database.comments.create({
            text: "asd",
            user_id: "other-user",
            article_id: article.id
        })
        await expect(() => 
        sut.handler({
            user_id: user.id, 
            comment_id: comment.id
        }))
        .rejects.toBeInstanceOf(ForbiddenOperationError)

    })
})