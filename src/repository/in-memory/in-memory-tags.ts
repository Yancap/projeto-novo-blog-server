import { TagsRepository } from './../interfaces/interface-tags-repository';
import { Tags, Prisma } from '@prisma/client';


export class InMemoryTags implements TagsRepository {
    public items: Tags[] = []

    async create(data: Prisma.TagsCreateInput) {
        const tags = {
            id: data.id ?? 'tag-01',
            tag: data.tag
        }
        this.items.push(tags)
        return tags
    }
    async findByName(name: string) {
        const tag = this.items.find(tag => tag.tag === name)
        if(!tag) {
            return null
        }
        return tag
    }
    async findById(id: string) {
        const tag = this.items.find(tag => tag.id === id)
        if(!tag) {
            return null
        }
        return tag
    }
    async selectTagsByName(name: string) {
        const tags = this.items.filter(tag => tag.tag === name)
        if(!tags) {
            return null
        }
        return tags
    }

}