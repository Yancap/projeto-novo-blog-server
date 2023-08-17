import { Users, Prisma } from '@prisma/client';
import { UsersRepository } from "../interfaces/interface-users-repository";


export class InMemoryUsers implements UsersRepository {
    public items: Users[] = []

    async register(data: Prisma.UsersCreateInput) {
        const user = {
            id: data.id ?? 'user-01',
            name: data.name,
            email: data.email,
            avatar: data.avatar ?? ''
        }
        this.items.push(user)
        return user
    }
    
    async findByEmail(email: string) {
        const user = this.items.find(user => user.email === email)
        if(!user) {
            return null
        }
        return user
    }

    async findById(id: string) {
        const user = this.items.find(user => user.id === id)
        if(!user) {
            return null
        }
        return user
    }

    async deleteById(id: string) {
        this.items = this.items.filter(user => user.id !== id)
        return this.items
    }
}