import { TagsRepository } from '../../repository/interfaces/interface-tags-repository';

interface ICreateTagService{
    id?: string;
    name: string;
}

export class CreateTagService {
    constructor(
        private tagsRepository: TagsRepository,
    ) { }
    async handler({id, name}: ICreateTagService){
        const tagName = name.toLowerCase()
        let tag = await this.tagsRepository.findByName(tagName)
        if (tag) {
            return null
        }

        tag = await this.tagsRepository.create({
            id: id,
            tag: tagName
        })
        
        return tag
    }
}