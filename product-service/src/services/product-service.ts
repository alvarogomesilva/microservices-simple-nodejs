import axios from 'axios';
import { CreateProductDto } from '../types/product';
import { prismaClient } from '../config/prisma-client';

export const getAllProducts = async () => {
  return await prismaClient.product.findMany();
};

export const getProductById = async (id: number) => {
  return await prismaClient.product.findUnique({
    where: { id }
  });
};

export const createProduct = async (data: CreateProductDto) => {
  try {

    return await prismaClient.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        categoryId: data.categoryId
      }
    });
  } catch (error) {
    console.error(error);
    return false;
  }
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
  const product = await prismaClient.product.findUnique({
    where: { id }
  });

  if (!product) {
    return null;
  }

  return await prismaClient.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id: number) => {
  // Verificar se o produto existe
  const product = await prismaClient.product.findUnique({
    where: { id }
  });

  if (!product) {
    return false;
  }

  await prismaClient.product.delete({
    where: { id }
  });

  return true;
};