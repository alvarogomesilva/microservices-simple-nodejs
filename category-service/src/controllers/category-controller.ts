import { Request, Response } from "express";
import * as CategoryService from '../services/category-service';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
    
        if (!name) {
          res.status(400).json({ message: 'Dados incompletos' });
          return
        }
    
        const product = await CategoryService.createCategory(name);
        res.status(201).json(product);
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
      }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const category = await CategoryService.getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: 'Categoria não encontrado' });
      return
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};