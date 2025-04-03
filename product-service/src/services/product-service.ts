import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const createProduct = async (
  name: string,
  description: string,
  price: number,
  quantity: number
) => {
  return await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity
    }
  });
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
  }
) => {
  // Verificar se o produto existe
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return null;
  }

  return await prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id: number) => {
  // Verificar se o produto existe
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return false;
  }

  await prisma.product.delete({
    where: { id }
  });

  return true;
};