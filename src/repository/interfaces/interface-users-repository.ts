import { Users, Prisma} from "@prisma/client";

export interface UsersRepository {
    register(data: Prisma.UsersCreateInput): Promise<Users>
    findByEmail(email: string): Promise<Users | null>
    findById(id: string): Promise<Users | null>
    deleteById(id: string): Promise<Users | null>
}