import { Management, Prisma} from "@prisma/client";

export interface ManagementRepository {
    register(data: Prisma.ManagementCreateInput): Promise<Management>
    findByEmail(email: string): Promise<Management | null>
    findById(id: string): Promise<Management | null>
    findAuthors(): Promise<Management[] | null>
    deleteById(id: string): Promise< Management | null>
}