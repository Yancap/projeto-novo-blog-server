import { ArticlesTagsRepository } from './../../repository/interfaces/interface-articles-tags-repository';
import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { TagsRepository } from '../../repository/interfaces/interface-tags-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryTags } from '../../repository/in-memory/in-memory-tags';
import { CreateArticlesTagsService } from './create-articles-tags-services';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { InMemoryArticleTags } from '../../repository/in-memory/in-memory-articles-tags';
import { ArticlesTags } from '@prisma/client';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';


let articlesTagsRepository: ArticlesTagsRepository
let tagsRepository: TagsRepository
let articlesRepository: ArticlesRepository
let sut: CreateArticlesTagsService

describe.skip('Create Articles Tags Service', () => {

    beforeEach(()=>{
        tagsRepository = new InMemoryTags()
        articlesRepository = new InMemoryArticles()
        articlesTagsRepository = new InMemoryArticleTags()

        sut = new CreateArticlesTagsService(
            articlesTagsRepository,
            articlesRepository,
            tagsRepository
        )
    })

    it('should be able to create a relation between Article and Tags', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile",
            manager_id: "admin-01"
        })

        const tags = await tagsRepository.create({
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
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile",
            manager_id: "admin-01"
        })

        const tag_1 = await tagsRepository.create({
            id: "tag-01",
            tag: "mobile"
        })
        const tag_2 = await tagsRepository.create({
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
        
        const tags = await tagsRepository.create({
            id: "tag-01",
            tag: "mobile"
        })

        
        await expect(() => sut.handler({
            article_id: 'inexistent',
            tag_id: tags.id
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
    it('should not be able to create a relation without an existent Tag', async () => {
        
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
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