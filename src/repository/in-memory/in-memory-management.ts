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
    async findAuthors() {
        const authors = this.items.filter(author => author.hierarchy === "author")
        if(!authors) {
            return null
        }
        return authors
    }
    async deleteById(id: string) {
        const manager = this.items.find(author => author.id === id)
        this.items = this.items.filter(author => author.id !== id)

        if(!manager) return null
        
        return manager
    }

    async changeAvatar({id, avatar}: {avatar: string, id: string}) {
        try {
            this.items = this.items.map(author => {
                if(author.id === id) return {...author, avatar: avatar}
                return author
            })
            return true
        } catch (e) {
            return false
        }
    }
}