import { Management, Prisma } from '@prisma/client';
import { ManagementRepository } from "../interfaces/interface-management-repository";


export class InMemoryManagement implements ManagementRepository {
    public items: Management[] = []

    async register(data: Prisma.ManagementCreateInput) {
        const author = {
            id: data.id ?? 'author-01',
            name: data.name,
            email: data.email,
            password: data.password,
            hierarchy: data.hierarchy ?? "author",
            avatar: ""
        }
        this.items.push(author)
        return author
    }
    
    async findByEmail(email: string) {
        const author = this.items.find(author => author.email === email)
        if(!author) {
            return null
        }
        return author
    }

    async findById(id: string) {
        const author = this.items.find(author => author.id === id)
        if(!author) {
            return null
        }
        return author
    }

    async deleteById(id: string) {
        this.items = this.items.filter(author => author.id !== id)
        return this.items
    }
}