import { beforeEach, describe, expect, it } from 'vitest';
import { CreateArticlesTagsService } from './create-articles-tags-services';
import { ArticlesTags } from '@prisma/client';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';


let database: DatabaseMemory;
let sut: CreateArticlesTagsService

describe('Create Articles Tags Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()

        sut = new CreateArticlesTagsService(
            database.articlesTags,
            database.articles,
            database.tags
        )
    })

    it('should be able to create a relation between Article and Tags', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile",
            manager_id: "admin-01"
        })

        const tags = await database.tags.create({
            id: "tag-01",
            tag: "mobile"
        })

        const articles_tags = await sut.handler({
            article_id: article.id,
            tag_id: tags.id
        })
        
        expect(articles_tags.id).toEqual(expect.any(String))
    })
    it('should be able to create a relation between an Article and many Tags', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile",
            manager_id: "admin-01"
        })

        const tag_1 = await database.tags.create({
            id: "tag-01",
            tag: "mobile"
        })
        const tag_2 = await database.tags.create({
            id: "tag-02",
            tag: "design"
        })

        const articles_tags: ArticlesTags[] = []

        articles_tags.push(await sut.handler({
            article_id: article.id,
            tag_id: tag_1.id
        }))
        articles_tags.push(await sut.handler({
            article_id: article.id,
            tag_id: tag_2.id
        }))
        
        expect(articles_tags[0].article_id).toEqual(article.id)
        expect(articles_tags[1].article_id).toEqual(article.id)
    })
    it('should not be able to create a relation without an existent Article', async () => {
        
        const tags = await database.tags.create({
            id: "tag-01",
            tag: "mobile"
        })

        
        await expect(() => sut.handler({
            article_id: 'inexistent',
            tag_id: tags.id
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
    it('should not be able to create a relation without an existent Tag', async () => {
        
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile",
            manager_id: "admin-01"
        })

        
        await expect(() => sut.handler({
            article_id: article.id,
            tag_id: 'inexistent'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})