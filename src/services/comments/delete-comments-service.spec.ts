import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteCommentsService } from './delete-comments-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory
let sut: DeleteCommentsService

describe('Delete Comments Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new DeleteCommentsService(database.comments)
    })

    it('should be able to delete a Comment', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            image: "",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const comments = await database.comments.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })
        const isDelete = await sut.handler({ comment_id: comments.id, article_id: article.id})
        expect(isDelete).toEqual(true)
    })

    
})