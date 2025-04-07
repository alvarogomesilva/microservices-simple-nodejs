import { Request, Response } from 'express';
import * as ProductService from '../services/product-service';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, categoryId } = req.body;

    if (!name || !description || price === undefined || quantity === undefined || !categoryId) {
      res.status(400).json({ message: 'Dados incompletos' });
      return
    }

    const product = await ProductService.createProduct({name, description, price, quantity, categoryId});
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, quantity } = req.body;

    const product = await ProductService.updateProduct(id, {
      name,
      description,
      price,
      quantity
    });

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await ProductService.deleteProduct(id);

    if (!success) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};