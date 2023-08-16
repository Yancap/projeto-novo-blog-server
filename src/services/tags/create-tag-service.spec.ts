import { TagsRepository } from './../../repository/interfaces/interface-tags-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateTagService } from './create-tag-service';
import { InMemoryTags } from '../../repository/in-memory/in-memory-tags';



let tagsRepository: TagsRepository
let sut: CreateTagService

describe('Create Tag Service', () => {

    beforeEach(()=>{
        tagsRepository = new InMemoryTags()

        sut = new CreateTagService(
            tagsRepository
        )
    })

    it('should be able to create a Tag', async () => {
        const tag = await sut.handler({
            name: "front-end"
        })
        expect(tag.id).toEqual(expect.any(String))
    })
    it('should not be able to create a Tag with same Name', async () => {
        await sut.handler({
            name: "front-end"
        })
        await sut.handler({
            name: "front-end"
        })
        const tags = await tagsRepository.selectTagsByName("front-end")
        expect(tags).toHaveLength(1)
    })
})