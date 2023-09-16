import { beforeEach, describe, expect, it } from 'vitest';
import { CreateTagService } from './create-tag-service';
import { InMemoryTags } from '../../repository/in-memory/in-memory-tags';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetTagsByArticleId } from './get-tags-by-article-id';

let database: DatabaseMemory;
let sut: GetTagsByArticleId

describe('Get Tags by Articles ID Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new GetTagsByArticleId(
            database.tags,
            database.articlesTags
        )
    })

    it('should be able to get a Tag by Article ID', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const tag = await database.tags.create({
            tag: "front-end"
        })
        await database.articlesTags.create({ tag_id: tag.id, article_id: article.id })
        const tags = await sut.handler({ article_id: article.id })
        if (!tags) return expect(tags).not.toBeNull()
        expect(tags[0]).toEqual(expect.any(Object))
    })
    it('should be able to get several Tags by Article ID', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const tag1 = await database.tags.create({
            tag: "front-end"
        })
        const tag2 = await database.tags.create({
            tag: "back-end"
        })
        await database.articlesTags.create({ tag_id: tag1.id, article_id: article.id })
        await database.articlesTags.create({ tag_id: tag2.id, article_id: article.id })

        const tags = await sut.handler({ article_id: article.id })
        if (!tags) return expect(tags).not.toBeNull()
        expect(tags).toHaveLength(2)
    })
})