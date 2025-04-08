import { prismaClient } from "../config/prisma-client"

export const createCategory = async (name: string) => {
    return await prismaClient.category.create({
        data: {
            name
        }
    })
}

export const getCategoryById = async (id: number) => {
    return await prismaClient.category.findUnique({
        where: { id }
    })
}