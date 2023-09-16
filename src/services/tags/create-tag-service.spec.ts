import { beforeEach, describe, expect, it } from 'vitest';
import { CreateTagService } from './create-tag-service';
import { InMemoryTags } from '../../repository/in-memory/in-memory-tags';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: CreateTagService

describe('Create Tag Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()

        sut = new CreateTagService(
            database.tags
        )
    })

    it('should be able to create a Tag', async () => {
        const tag = await sut.handler({
            name: "front-end"
        })
        expect(tag).toEqual(expect.any(Object))
    })
    it('should not be able to create a Tag with same Name', async () => {
        await sut.handler({
            name: "front-end"
        })
        await sut.handler({
            name: "front-end"
        })
        const tags = await database.tags.findByName("front-end")
        expect(tags).toEqual(expect.any(Object))
    })
})