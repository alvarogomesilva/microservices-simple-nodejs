import { Request, Response } from 'express';
import * as AuthService from '../services/auth-service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
       res.status(400).json({ message: 'Dados incompletos' });
       return
    }

    const result = await AuthService.registerUser(email, password, name);
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email e senha são obrigatórios' });
      return
    }

    const result = await AuthService.loginUser(email, password);

    if (!result.success) {
      res.status(401).json({ message: result.message });
      return
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};