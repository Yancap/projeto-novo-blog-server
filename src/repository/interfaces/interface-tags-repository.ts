import { Tags, Prisma} from "@prisma/client";

interface TagName {
    name: string | undefined
    id: string
}

export interface TagsRepository {
    create(data: Prisma.TagsCreateInput): Promise<Tags>
    findByName(name: string): Promise<Tags | null>
    //selectTagsByName(name: string): Promise<Tags[] | null>
    findById(id: string): Promise<TagName | null>
}