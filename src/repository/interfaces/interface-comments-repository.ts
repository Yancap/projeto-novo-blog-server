import { Comments, Prisma} from "@prisma/client";

export interface CommentsRepository {
    create(data: Prisma.CommentsUncheckedCreateInput): Promise<Comments>
    delete(id: string): Promise<Comments>
    findById(id: string): Promise<Comments | null>

}