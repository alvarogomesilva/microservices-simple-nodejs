import { prismaClient } from "../config/prisma-client"

export const createCategory = async (name: string) => {
    return await prismaClient.category.create({
        data: {
            name
        }
    })
}