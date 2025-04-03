import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

// Extender o tipo Request para incluir o userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({ message: 'Erro no token' });
    return
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: 'Token mal formatado' });
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Token inválido' });
  }
};